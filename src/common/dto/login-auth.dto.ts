import { ConditionalApiProperty } from '#config/swagger/swagger.decorator';
import {
  IsStrongPassword,
  Length,
  MaxLength,
  NotContains,
} from 'class-validator';

export class LoginAuthDto {
  @ConditionalApiProperty({
    required: true,
    example: 'user@example.com',
  })
  @Length(5, 45)
  @NotContains("'")
  @NotContains('"')
  content: string;

  @ConditionalApiProperty({ required: true, example: 'Password.2025' })
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
