import { LoginAuthDto } from '@/common/dto/login-auth.dto';
import { RegisterAuthDto } from '@/common/dto/register-authdto';
import { PasswordService } from '@/common/resources/password/password.service';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly usersService: UsersService,
  ) {}
  login(loginAuthDto: LoginAuthDto) {
    return this.usersService.findLoginUser(loginAuthDto);
  }
  async register(registerAuthDto: RegisterAuthDto) {
    const { repeat_password, ...createUserDto } = registerAuthDto;
    this.passwordService.passwordRepeat(
      createUserDto.password,
      repeat_password,
    );
    return await this.usersService.create(createUserDto);
  }
}
