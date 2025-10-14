import { Request, Response } from 'express';
import { Injectable, Logger } from '@nestjs/common';
import { LoginAuthDto } from '#dto/login-auth.dto';
import { RegisterAuthDto } from '#dto/register-auth.dto';
import { PasswordService } from '#resources/password/password.service';
import { UsersAuthService } from '@/modules/users/service/users-auth.service';
import { CookiesService } from '#resources/cookies/cookies.service';
import { JwtCustomService } from '#resources/jwt/jwt-custom.service';
import {
  COOKIE_MAX_AGE_JWT,
  COOKIE_MAX_AGE_REFRESH,
  JWT_COOKIE,
  REFRESH_COOKIE,
} from './constants/cookies.constants';
import { UnauthorizedLoginException } from '#config/errors/custom.exceptions';
import { PayloadUser } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  #logger: Logger;
  constructor(
    private readonly passwordService: PasswordService,
    private readonly usersAuthService: UsersAuthService,
    private readonly cookiesService: CookiesService,
    private readonly jwtCustomService: JwtCustomService,
  ) {
    this.#logger = new Logger('Auth-Service', { timestamp: true });
  }

  async login(loginAuthDto: LoginAuthDto, res: Response) {
    const loginAuth = await this.usersAuthService.findLoginUser(loginAuthDto);
    await this.#CreateJwtCookies(loginAuth, res);
    return { message: 'Login successful' };
  }

  async register(registerAuthDto: RegisterAuthDto, res: Response) {
    // ? Create User
    const { repeat_password: _, ...createUserDto } = registerAuthDto;
    const register = await this.usersAuthService.create(createUserDto);

    // ? Set Cookie
    await this.#CreateJwtCookies(register, res);
    return { message: 'Registration successful' };
  }

  async logout(res: Response) {
    // ? Clear Cookies
    this.#cleanJwt(res);
    return { message: 'Logout successful' };
  }

  async refresh(req: Request, res: Response) {
    const oldRefreshToken = this.cookiesService.get(req, REFRESH_COOKIE);

    if (!oldRefreshToken) {
      throw new UnauthorizedLoginException('Refresh token not found');
    }

    try {
      const verifiedPayload =
        await this.jwtCustomService.verifyRefreshToken(oldRefreshToken);

      await this.#CreateJwtCookies(verifiedPayload, res);
      return { message: 'Tokens refreshed successfully' };
    } catch (error) {
      if (!res.headersSent) {
        this.#cleanJwt(res);
      }
      throw new UnauthorizedLoginException('Invalid refresh token');
    }
  }
  async #CreateJwtCookies(payloadUser: PayloadUser, res: Response) {
    try {
      const { accessToken, refreshToken } =
        await this.jwtCustomService.createTokenPair(payloadUser);

      this.cookiesService.set(res, JWT_COOKIE, accessToken, {
        maxAge: COOKIE_MAX_AGE_JWT,
      });
      this.cookiesService.set(res, REFRESH_COOKIE, refreshToken, {
        maxAge: COOKIE_MAX_AGE_REFRESH,
      });
    } catch (error) {
      this.#logger.debug('Failed to create JWT cookies', error.stack);

      if (!res.headersSent) {
        this.#cleanJwt(res);
      }

      throw new UnauthorizedLoginException(
        'Failed to create authentication tokens',
      );
    }
  }

  #cleanJwt(res: Response) {
    this.cookiesService.clear(res, JWT_COOKIE);
    this.cookiesService.clear(res, REFRESH_COOKIE);
  }
}
