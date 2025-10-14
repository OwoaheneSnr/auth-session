import 'dotenv/config';
import { z } from 'zod';
const RegexKey = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,50}$/;

const envsSchema = z.object({
  // ? Server
  PORT_SERVER: z.coerce.number().int().nonnegative(),
  SECRET_JWT: z.string().regex(RegexKey),
  REFRESH_JWT: z.string().regex(RegexKey),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  // ? DB
  USERNAME_DB: z.string().nonempty({ message: 'DB_USER is required' }),
  PASSWORD_DB: z.string().regex(RegexKey),
  NAME_DB: z.string().nonempty({ message: 'DB_NAME is required' }),
  PORT_DB: z.coerce
    .number()
    .int()
    .positive({ message: 'DB_PORT must be a positive integer' }),
  HOST_DB: z
    .string()
    .nonempty({ message: 'DB_HOST is required' })
    .default('localhost'),
  DATABASE_URL: z.string().nonempty({ message: 'URL is required' }),
  // ? Admin
  NAME_ADMIN: z.string().min(6),
  PASSWORD_ADMIN: z.string().regex(RegexKey),
  EMAIL_ADMIN: z.email(),
});

const result = envsSchema.safeParse(process.env);

if (result.error) {
  throw new Error(`Config validation error: \${result.error.message}`);
}

const envs = result.data;

export { envs };
