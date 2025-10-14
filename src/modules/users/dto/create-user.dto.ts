import { RegisterAuthDto } from '#dto/register-auth.dto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto extends OmitType(RegisterAuthDto, [
  'repeat_password',
] as const) {}
