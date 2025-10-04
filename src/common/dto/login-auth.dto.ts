import {
  IsStrongPassword,
  Length,
  MaxLength,
  NotContains,
} from 'class-validator';

export class LoginAuthDto {
  @Length(5, 45)
  @NotContains("'")
  @NotContains('"')
  content: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @MaxLength(25)
  password: string;
}
