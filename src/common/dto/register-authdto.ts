import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
  NotContains,
} from 'class-validator';
export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(5, 45)
  @NotContains('@')
  name: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @MaxLength(25)
  password: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @MaxLength(25)
  repeat_password: string;
}
