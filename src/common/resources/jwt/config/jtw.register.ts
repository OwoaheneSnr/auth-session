import { envs } from '#config/envs';
import { JwtModuleOptions } from '@nestjs/jwt';
import { EXPIRES_JWT } from '../constants/jwt.constants';

export const jwtOptions: JwtModuleOptions = {
  global: true,
  secret: envs.SECRET_JWT,
  signOptions: { expiresIn: EXPIRES_JWT },
};
