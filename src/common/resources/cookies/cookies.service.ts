import { Injectable } from '@nestjs/common';
import { Response, Request, CookieOptions } from 'express';
import { envs } from '#config/envs';
import { CookieConfig } from './interfaces/cookie.interface';

@Injectable()
export class CookiesService {
  readonly #isProduction: boolean;
  readonly #baseOptions: CookieOptions;

  constructor() {
    this.#isProduction = envs.NODE_ENV === 'production';
    this.#baseOptions = {
      httpOnly: true,
      sameSite: this.#isProduction ? 'strict' : 'lax',
      secure: this.#isProduction,
      path: '/',
    };
  }

  /**
   * Sets a cookie with optional custom options
   */
  set(
    res: Response,
    name: string,
    value: string,
    options?: Partial<CookieOptions>,
  ): void {
    const mergedOptions = { ...this.#baseOptions, ...options };
    res.cookie(name, value, mergedOptions);
  }

  /**
   * Gets a cookie value by name
   */
  get(req: Request, name: string): string | undefined {
    return req.cookies?.[name];
  }

  /**
   * Updates an existing cookie with a new value
   */
  update(
    res: Response,
    name: string,
    value: string,
    options?: Partial<CookieOptions>,
  ): void {
    this.set(res, name, value, options);
  }

  /**
   * Updates a cookie only if it exists
   */
  updateIfExists(
    req: Request,
    res: Response,
    name: string,
    value: string,
    options?: Partial<CookieOptions>,
  ): boolean {
    if (this.has(req, name)) {
      this.update(res, name, value, options);
      return true;
    }
    return false;
  }

  /**
   * Clears a cookie by name
   */
  clear(res: Response, name: string, options?: Partial<CookieOptions>): void {
    const clearOptions = {
      httpOnly: this.#baseOptions.httpOnly,
      sameSite: this.#baseOptions.sameSite,
      secure: this.#baseOptions.secure,
      path: this.#baseOptions.path,
      ...options,
    };
    res.clearCookie(name, clearOptions);
  }

  /**
   * Checks if a cookie exists
   */
  has(req: Request, name: string): boolean {
    return req.cookies && name in req.cookies;
  }

  /**
   * Gets all cookies
   */
  getAll(req: Request): Record<string, string> {
    return req.cookies || {};
  }

  /**
   * Sets multiple cookies at once
   */
  setMultiple(
    res: Response,
    cookies: Array<{
      name: string;
      value: string;
      options?: Partial<CookieOptions>;
    }>,
  ): void {
    cookies.forEach(({ name, value, options }) => {
      this.set(res, name, value, options);
    });
  }

  /**
   * Updates multiple cookies at once
   */
  updateMultiple(
    res: Response,
    cookies: Array<{
      name: string;
      value: string;
      options?: Partial<CookieOptions>;
    }>,
  ): void {
    this.setMultiple(res, cookies);
  }

  /**
   * Clears multiple cookies at once
   */
  clearMultiple(res: Response, names: string[]): void {
    names.forEach((name) => this.clear(res, name));
  }

  /**
   * Creates a complete cookie config with default values
   */
  createConfig(config: CookieConfig): Required<CookieConfig> {
    return {
      key: config.key,
      maxAge: config.maxAge ?? 0,
      options: { ...this.#baseOptions, ...config.options },
    };
  }

  /**
   * Sets a session cookie (expires when browser closes)
   */
  setSession(res: Response, name: string, value: string): void {
    const { maxAge, ...sessionOptions } = this.#baseOptions;
    this.set(res, name, value, sessionOptions);
  }

  /**
   * Sets an authentication token cookie with appropriate security settings
   */
  setAuthToken(
    res: Response,
    name: string,
    token: string,
    maxAge: number,
  ): void {
    this.set(res, name, token, {
      maxAge,
      httpOnly: true,
      secure: this.#isProduction,
      sameSite: this.#isProduction ? 'strict' : 'lax',
    });
  }

  /**
   * Updates an authentication token cookie
   */
  updateAuthToken(
    res: Response,
    name: string,
    token: string,
    maxAge: number,
  ): void {
    this.setAuthToken(res, name, token, maxAge);
  }

  /**
   * Clears all authentication-related cookies
   */
  clearAuthCookies(res: Response, cookieNames: string[]): void {
    this.clearMultiple(res, cookieNames);
  }

  /**
   * Refreshes a cookie's expiration time without changing its value
   */
  refreshExpiration(
    req: Request,
    res: Response,
    name: string,
    maxAge: number,
  ): boolean {
    const currentValue = this.get(req, name);
    if (currentValue) {
      this.update(res, name, currentValue, { maxAge });
      return true;
    }
    return false;
  }
}
