import {
  Injectable,
  ConflictException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { isEmail } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from '#config/prisma/prisma.service';
import { PasswordService } from '#resources/password/password.service';
import { UnauthorizedLoginException } from '#config/errors/custom.exceptions';
import { LoginAuthDto } from '#dto/login-auth.dto';
import { UserEntity } from '../entities/user.entity';
import { FindUserParams } from '../interface/FindUserParams.interface';
import { CreateAdmin } from '../interface/create-admin.interface';
import { Role } from '@prisma/client';

interface AdminCreationResult {
  created: boolean;
  userId?: string;
  reason?: string;
}

@Injectable()
export class UsersAuthService {
  readonly #logger = new Logger(UsersAuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password, ...userData } = createUserDto;

    const existingUser = await this.#findUserByContent({ email, name }, false);
    if (existingUser) {
      throw new ConflictException('Unable to complete registration');
    }

    try {
      const encryptedPassword = await this.passwordService.encrypt(password);

      const user = UserEntity.fromPrisma(
        await this.prisma.user.create({
          data: {
            ...userData,
            email,
            name,
            password: encryptedPassword,
          },
        }),
      );

      return user.toJwtPayload();
    } catch (error) {
      this.#handleError(error, 'Create User');
    }
  }

  async createAdmin(createAdminDto: CreateAdmin): Promise<AdminCreationResult> {
    const { email, name, password, ...adminData } = createAdminDto;

    const existingUser = await this.#findUserByContent({ email, name });
    if (existingUser) {
      return { created: false, reason: 'User already exists' };
    }

    try {
      const encryptedPassword = await this.passwordService.encrypt(password);
      const admin = await this.prisma.user.create({
        data: {
          ...adminData,
          email,
          name,
          password: encryptedPassword,
          rol: Role.ADMIN,
        },
      });

      this.#logger.log(`Admin created successfully: ${admin.email}`);
      return { created: true, userId: admin.id };
    } catch (error) {
      this.#handleError(error, 'Create Admin');
    }
  }

  async findLoginUser(loginAuthDto: LoginAuthDto) {
    const { content, password } = loginAuthDto;

    const user = await this.#findUserByContent({ content });
    if (!user) {
      throw new UnauthorizedLoginException('Invalid credentials');
    }

    await this.passwordService.verify(password, user.password);

    return user.toJwtPayload();
  }

  async #findUserByContent(
    params: FindUserParams,
    available: boolean = true,
  ): Promise<UserEntity | null> {
    try {
      let whereClause: any;

      if ('content' in params) {
        const isEmailContent = isEmail(params.content);
        whereClause = isEmailContent
          ? { email: params.content }
          : { name: params.content };
      } else {
        whereClause = {
          OR: [{ email: params.email }, { name: params.name }],
        };
      }

      const user = await this.prisma.user.findFirst({
        where: {
          ...whereClause,
          available,
        },
      });
      return user ? UserEntity.fromPrisma(user) : null;
    } catch (error) {
      this.#handleError(error, 'Find User By Content');
    }
  }

  #handleError(error: any, context: string): never {
    const message = error?.message || error?.toString() || 'Unknown error';
    this.#logger.error(`Error in ${context}: ${message}`, error.stack);
    throw new InternalServerErrorException(
      `Failed to ${context.toLowerCase()}`,
    );
  }
}
