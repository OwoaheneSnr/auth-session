import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY, ROLES_KEY } from '#common/role/constants/roles_decorators';
import { Role } from '@prisma/client';
import { PayloadUserJWT } from '#modules/auth/interfaces/jwt.interface';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Use ROLES_KEY constant instead of hardcoded string
    const Roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadUserJWT;

    if (!Roles && user.rol === Role.USER) {
      return true;
    }

    if (!user) {
      return false;
    }

    if (!user.rol) {
      return false;
    }

    const hasRole = Roles.includes(user.rol);

    return hasRole;
  }
}
