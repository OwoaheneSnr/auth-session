import { RegisterAuthDto } from '@/common/dto/register-authdto';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto extends OmitType(RegisterAuthDto, [
  'repeat_password',
] as const) {}
