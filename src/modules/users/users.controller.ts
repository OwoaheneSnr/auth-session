import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Query,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import express from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './service/users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '#dto/pagination.dto';
import { Roles, ADMIN } from '#common/role/roles.decorator';
import { ValidateJwtAuthGuard } from '#modules/auth/guards/jtw-validate.guard';
import { Role } from '@prisma/client';
import { PayloadUserJWT } from '#modules/auth/interfaces/jwt.interface';
import { RefreshJwtAuthGuard } from '#modules/auth/guards/jwt-refresh.guard';
import { UserRoleGuard } from '#common/role/guards/role-validate.guard';
import { UpdatePatch } from '#resources/updateDecorators/updatePatch.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(ValidateJwtAuthGuard, UserRoleGuard, RefreshJwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async getMyProfile(@Req() req: express.Request) {
    const user = req.user as any;
    return this.usersService.findOneOrThrow(user.id);
  }

  @ADMIN()
  @Get()
  @ApiCreatedResponse({ isArray: true })
  @HttpCode(HttpStatus.OK)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  @ApiCreatedResponse()
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
  ) {
    return this.usersService.findOneOrThrow(id);
  }

  @ADMIN()
  @UpdatePatch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return updatedUser;
  }

  @Roles(Role.ADMIN, Role.USER)
  @UpdatePatch()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async updateMe(
    @Req() req: express.Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = req.user as PayloadUserJWT;
    const updatedUser = await this.usersService.update(user.id, updateUserDto);
    return updatedUser;
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMyAccount(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    const user = req.user as any;
    return await this.usersService.removeSoft(user.id, res);
  }

  @ADMIN()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.removeHard(id);
  }
}
