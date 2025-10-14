import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './users.controller';
import { PasswordModule } from '#resources/password/password.module';
import { PrismaModule } from '#config/prisma/prisma.module';
import { UsersAuthService } from './service/users-auth.service';
import { JwtCustomModule } from '#resources/jwt/jwt-custom.module';
import { CookiesModule } from '#resources/cookies/cookies.module';

@Module({
  imports: [PasswordModule, PrismaModule, JwtCustomModule, CookiesModule],
  controllers: [UsersController],
  providers: [UsersAuthService, UsersService],
  exports: [UsersService, UsersAuthService],
})
export class UsersModule {}
