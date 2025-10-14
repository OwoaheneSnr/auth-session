import { IAuthModuleOptions } from '@nestjs/passport';
import { JWT_COOKIE } from '../constants/cookies.constants';

export const passportOption: IAuthModuleOptions = {
  defaultStrategy: JWT_COOKIE,
  session: false,
};
