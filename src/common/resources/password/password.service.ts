import { UnauthorizedLoginException } from '#config/errors/custom.exceptions';
import { Injectable } from '@nestjs/common';
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
}
