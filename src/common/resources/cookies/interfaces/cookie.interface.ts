import { CookieOptions } from 'express';

export interface CookieConfig {
  key: string;
  maxAge: number;
  options?: Partial<CookieOptions>;
}

export interface CookieSetOptions {
  name: string;
  value: string;
  maxAge: number;
}
