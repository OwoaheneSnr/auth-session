import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envs } from '#config/envs';
import { EXPIRES_JWT, EXPIRES_REFRESH_JWT } from './constants/jwt.constants';
import { PayloadUser } from '#modules/auth/interfaces/jwt.interface';

@Injectable()
export class JwtCustomService {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(payload: PayloadUser): Promise<string> {
    const cleanPayload = this.sanitizePayload(payload);
    return this.jwtService.signAsync(cleanPayload, {
      secret: envs.SECRET_JWT,
      expiresIn: EXPIRES_JWT,
    });
  }

  async createRefreshToken(payload: PayloadUser): Promise<string> {
    const cleanPayload = this.sanitizePayload(payload);
    return this.jwtService.signAsync(cleanPayload, {
      secret: envs.REFRESH_JWT,
      expiresIn: EXPIRES_REFRESH_JWT,
    });
  }

  async createTokenPair(payload: PayloadUser): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.createAccessToken(payload),
      this.createRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<PayloadUser> {
    return this.jwtService.verifyAsync<PayloadUser>(token, {
      secret: envs.SECRET_JWT,
    });
  }

  async verifyRefreshToken(token: string): Promise<PayloadUser> {
    return this.jwtService.verifyAsync<PayloadUser>(token, {
      secret: envs.REFRESH_JWT,
    });
  }

  decodeToken(token: string): PayloadUser | null {
    return this.jwtService.decode(token) as PayloadUser | null;
  }

  /**
   * Removes JWT standard claims from payload to avoid conflicts
   * when creating new tokens
   */
  private sanitizePayload<T extends Record<string, any>>(payload: T): T {
    const jwtClaims = ['exp', 'iat', 'nbf', 'jti', 'aud', 'iss', 'sub'];
    const cleanPayload = { ...payload };

    jwtClaims.forEach((claim) => {
      delete cleanPayload[claim];
    });

    return cleanPayload as T;
  }
}
