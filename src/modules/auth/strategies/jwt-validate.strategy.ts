import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { envs } from '#config/envs';
import { CookiesService } from '#resources/cookies/cookies.service';
import { ForbiddenCustomException } from '#config/errors/custom.exceptions';
import { JWT_COOKIE, JWT_GUARD } from '../constants/cookies.constants';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtValidate extends PassportStrategy(Strategy, JWT_GUARD) {
  constructor(private readonly cookiesService: CookiesService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const cookieToken = cookiesService.get(req, JWT_COOKIE);
          return cookieToken || null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: envs.SECRET_JWT,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload || !payload.id) {
      throw new ForbiddenCustomException();
    }
    return payload;
  }
}
