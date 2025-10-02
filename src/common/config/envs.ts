import 'dotenv/config';
import { z } from 'zod';
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,50}$/;

const envsSchema = z.object({
  PORT_SERVER: z.coerce.number().int().nonnegative(),

  // ? DB
  USERNAME_DB: z.string().nonempty({ message: 'DB_USER is required' }),
  PASSWORD_DB: z.string().regex(passwordRegex),
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
});

const result = envsSchema.safeParse(process.env);

if (result.error) {
  throw new Error(`Config validation error: \${result.error.message}`);
}

const envs = result.data;

export { envs };
