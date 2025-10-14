import { Role } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface PayloadUser {
  id: string;
  rol: Role;
}

export interface PayloadUserJWT extends JwtPayload, PayloadUser {}
