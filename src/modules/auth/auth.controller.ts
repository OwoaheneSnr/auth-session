import express from 'express';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from '#dto/login-auth.dto';
import { RegisterAuthDto } from '#dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.login(loginAuthDto, res);
  }

  @Post('register')
  async register(
    @Body() registerAuthDto: RegisterAuthDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.register(registerAuthDto, res);
  }

  @Post('refresh')
  async refresh(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.refresh(req, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: express.Response) {
    return this.authService.logout(res);
  }
}
