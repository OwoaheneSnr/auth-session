import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordModule } from '@/common/resources/password/password.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [PasswordModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
