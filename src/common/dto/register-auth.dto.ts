import { ConditionalApiProperty } from '#config/swagger/swagger.decorator';
import { Match } from '#resources/match/match.decorator';
import { PasswordDto } from '#resources/password/password.decorator';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
  NotContains,
} from 'class-validator';

export class RegisterAuthDto {
  @ConditionalApiProperty({ required: true, format: 'email' })
  @IsEmail()
  email: string;

  @ConditionalApiProperty({ required: true, example: 'NameUser.2025' })
  @IsString()
  @Length(5, 45)
  @NotContains('@')
  name: string;

  @ConditionalApiProperty({ required: true, example: 'Password.2025' })
  @PasswordDto()
  password: string;

  @ConditionalApiProperty({ required: true, example: 'Password.2025' })
  @PasswordDto()
  @Match<RegisterAuthDto>('password')
  repeat_password: string;
}
