import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PUBLIC_KEY } from '#common/role/constants/roles_decorators';
import { JWT_GUARD } from '../constants/cookies.constants';
import { UnauthorizedResourceException } from '#config/errors/custom.exceptions';

@Injectable()
export class ValidateJwtAuthGuard extends AuthGuard(JWT_GUARD) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest<TUser = any>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedResourceException('Authentication failed');
    }
    return user;
  }
}
