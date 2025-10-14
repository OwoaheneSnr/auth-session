import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CookiesService } from '#resources/cookies/cookies.service';
import { envs } from '#config/envs';
import {
  REFRESH_COOKIE,
  REFRESH_JWT_GUARD,
} from '../constants/cookies.constants';
import { PayloadUser } from '../interfaces/jwt.interface';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  REFRESH_JWT_GUARD,
) {
  constructor(private readonly cookiesService: CookiesService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const cookieToken = cookiesService.get(req, REFRESH_COOKIE);
          return cookieToken || null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: envs.REFRESH_JWT,
      ignoreExpiration: false,
    });
  }

  async validate(payload: PayloadUser) {
    // Validate payload structure
    if (!payload || !payload.id) {
      throw new UnauthorizedException('Invalid refresh token payload');
    }

    return payload;
  }
}
