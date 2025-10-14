import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PUBLIC_KEY, ROLES_KEY } from './constants/roles_decorators';

// * Decorator Public
export const Public = () => SetMetadata(PUBLIC_KEY, true);

// * Decorator Roles
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// * Decorator User
export const USER = () => Roles(Role.USER);

// * Decorator Admin
export const ADMIN = () => Roles(Role.ADMIN);

// * Decorator Multiple Roles
export const USER_OR_ADMIN = () => Roles(Role.USER, Role.ADMIN);
