import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_JWT_GUARD } from '../constants/cookies.constants';
import { UnauthorizedResourceException } from '#config/errors/custom.exceptions';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard(REFRESH_JWT_GUARD) {
  handleRequest<TUser = any>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedResourceException('Invalid refresh token');
    }
    return user;
  }
}
