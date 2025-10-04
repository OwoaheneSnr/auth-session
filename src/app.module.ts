import { Module } from '@nestjs/common';
import { PrismaModule } from '@config/database/prisma.module';
import { PasswordModule } from '@/common/resources/password/password.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, PasswordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
