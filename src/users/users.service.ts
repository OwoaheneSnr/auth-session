import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordService } from '@resources/password/password.service';
import { PrismaService } from '@config/database/prisma.service';
import {
  ResourceInternalServerErrorException,
  ResourceNotFoundException,
  UnauthorizedLoginException,
} from '@resources/errors/custom.exceptions';
import { JwtService } from '@nestjs/jwt';
import { isEmail } from 'class-validator';
import { ErrorAndLogger } from '@/common/interface/log-error.interfaces';
import { UserEntity } from './entities/user.entity';
import { LoginAuthDto } from '@/common/dto/login-auth.dto';

@Injectable()
export class UsersService {
  #logger = new Logger('UserService');
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  // * UserModule
  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        where: { available: true },
      });
      return users.map((user) => new UserEntity(user));
    } catch (error) {
      this.#ErrorServer(error, { context: 'Find All Users' });
    }
  }

  async findOneOrThrow(id: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { id, available: true },
      });
      return UserEntity.fromPrisma(user);
    } catch (error) {
      throw new ResourceNotFoundException('User: Not Found');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findOneOrThrow(id);

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return UserEntity.fromPrisma(updatedUser);
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      this.#ErrorServer(error, { context: 'Update User' });
    }
  }

  async removeSoft(id: string) {
    // ? Find User
    await this.findOneOrThrow(id);
    // ! SoftDelete
    try {
      const { name } = await this.prisma.user.update({
        data: { available: false },
        where: { id },
      });
      return {
        message: `User "${name}" was successfully deleted`,
        status: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      this.#ErrorServer(error, { context: 'Remove-Soft' });
    }
  }

  // * Export AuthModule
  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.passwordService.encrypt(
        createUserDto.password,
      );
      const user = await this.prisma.user.create({ data: createUserDto });
      UserEntity.fromPrisma(user);
      return this.#createJWT(user);
    } catch (error) {
      this.#ErrorServer(error, { context: 'Create User' });
    }
  }

  async findLoginUser(loginAuthDto: LoginAuthDto) {
    const { content, password } = loginAuthDto;
    // ? FindUser
    const userByLogin = await this.#findUserByContent(content);
    if (!userByLogin) {
      throw new UnauthorizedLoginException();
    }

    // ! Password verify
    await this.passwordService.verify(password, userByLogin.password);

    return this.#createJWT(userByLogin);
  }

  // ! Private Method
  async #createJWT(userAuth: UserEntity) {
    const { available, password, ...userJWT } = userAuth;
    return await this.jwtService.signAsync(userJWT);
  }

  async #findUserByContent(content: string) {
    try {
      const whereClause = isEmail(content)
        ? { email: content }
        : { name: content };

      const user = await this.prisma.user.findFirst({
        where: {
          ...whereClause,
          available: true,
        },
      });

      return user;
    } catch (error) {
      this.#ErrorServer(error, { context: 'Find User By Content' });
    }
  }

  #ErrorServer(e: any, errorAndLogger?: ErrorAndLogger) {
    // ? Is Optional
    this.#logger.error(
      `${errorAndLogger?.context ? `[${errorAndLogger?.context}] ` : ''}${e?.message || 'Unknown error'}`,
      e?.stack,
    );
    throw new ResourceInternalServerErrorException(
      errorAndLogger?.customMessage ||
        'An unexpected error occurred, view console on server',
    );
  }
}
