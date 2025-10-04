import { UnauthorizedLoginException } from '@resources/errors/custom.exceptions';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class PasswordService {
  async verify(plainPassword: string, encryptPassword: string): Promise<true> {
    const passwordIsCorrect = await compare(plainPassword, encryptPassword);
    if (!passwordIsCorrect) throw new UnauthorizedLoginException();
    return passwordIsCorrect;
  }

  async encrypt(plainPassword: string, salt: number = 8) {
    const encryptPassword = await hash(plainPassword, salt);
    return encryptPassword;
  }

  passwordRepeat(password?: string, repeat_password?: string) {
    if (!password || !repeat_password)
      throw new BadRequestException(
        'You must enter the password and repeat it.',
      );
    if (repeat_password !== password)
      throw new BadRequestException(
        'Password and its repetition must be the same.',
      );
    return password;
  }
}
