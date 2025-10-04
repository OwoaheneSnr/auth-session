import { RegisterAuthDto } from '@/common/dto/register-authdto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(RegisterAuthDto) {}
