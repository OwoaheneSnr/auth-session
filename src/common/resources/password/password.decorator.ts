import { applyDecorators } from '@nestjs/common';
import { IsPositive, IsStrongPassword, MaxLength } from 'class-validator';

class PasswordFormat {
  @IsPositive()
  minLength: number;
  @IsPositive()
  minLowercase: number;
  @IsPositive()
  minNumbers: number;
  @IsPositive()
  minSymbols: number;
  @IsPositive()
  minUppercase: number;
  @IsPositive()
  maxLength: number;
}

const passwordOptions: PasswordFormat = {
  minLength: 8,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  minUppercase: 1,
  maxLength: 25,
};

export function PasswordDto(option: PasswordFormat = passwordOptions) {
  const { maxLength, ...isStrongPassword } = option;
  return applyDecorators(
    IsStrongPassword({
      ...isStrongPassword,
    }),
    MaxLength(maxLength),
  );
}
