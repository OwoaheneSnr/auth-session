import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaService } from '#config/prisma/prisma.service';
import { ResourceNotFoundException } from '#config/errors/custom.exceptions';
import { UserEntity } from '../entities/user.entity';
import { PaginationDto } from '#dto/pagination.dto';
import { getPaginationOptions } from '#common/utils/database/findAllPages';
import { PasswordService } from '#resources/password/password.service';
import { CookiesService } from '#resources/cookies/cookies.service';
import {
  JWT_COOKIE,
  REFRESH_COOKIE,
} from '#modules/auth/constants/cookies.constants';
import { Response } from 'express';
import { Role } from '@prisma/client';
import { ADMIN } from '#common/role/roles.decorator';

@Injectable()
export class UsersService {
  #logger: Logger;

  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly cookieService: CookiesService,
  ) {
    this.#logger = new Logger('UsersService');
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    const totalUser = await this.prisma.user.count({
      where: { available: true },
    });
    const lastPage = Math.ceil(totalUser / limit);

    const findUser = await this.prisma.user.findMany(
      getPaginationOptions(page, limit, { where: { available: true } }),
    );

    const users = UserEntity.fromPrismaArray(findUser);
    return {
      data: users,
      meta: { page, lastPage, limit, total: totalUser },
    };
  }

  async findOneOrThrow(id: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { id, available: true },
      });
      return UserEntity.fromPrisma(user);
    } catch (error) {
      this.#ErrorServer(error, { context: 'FindOne User' }, id);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    if (updateUserDto.password) {
      const { password } = updateUserDto;
      updateUserDto.password = await this.passwordService.encrypt(password);
    }
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id, available: true },
        data: updateUserDto,
      });
      return UserEntity.fromPrisma(updatedUser);
    } catch (error) {
      this.#ErrorServer(error, { context: 'Update User' }, id);
    }
  }

  async removeSoft(id: string, res: Response) {
    try {
      const { name } = await this.prisma.user.update({
        where: {
          id,
          rol: {
            not: Role.ADMIN,
          },
        },
        data: { available: false },
      });
      this.cookieService.clearMultiple(res, [REFRESH_COOKIE, JWT_COOKIE]);
      return {
        message: `User "${name}" was successfully deleted`,
        status: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      this.#ErrorServer(error, { context: 'Soft Remove User' }, id);
    }
  }

  async removeHard(id: string) {
    try {
      const { name } = await this.prisma.user.delete({
        where: {
          id,
          rol: {
            not: Role.ADMIN,
          },
        },
      });

      return {
        message: `User "${name}" was successfully deleted`,
        status: HttpStatus.ACCEPTED,
      };
    } catch (error) {
      this.#ErrorServer(error, { context: 'Soft Remove User' }, id);
    }
  }

  // Private method for error handling
  #ErrorServer(
    error: any,
    errorAndLogger?: { context: string },
    id?: string,
  ): never {
    if (error?.code === 'P2025') {
      throw new ResourceNotFoundException(`User with id ${id} not found`);
    }
    this.#logger.error(
      `[${errorAndLogger?.context}] ${error?.message || error?.toString()}`,
      error?.stack,
    );
    // Mensaje genérico al cliente
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
