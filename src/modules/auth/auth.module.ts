import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordModule } from '#resources/password/password.module';
import { UsersModule } from '@/modules/users/users.module';
import { passportOption } from './config/passport.register';
import { ValidateJwtAuthGuard } from './guards/jtw-validate.guard';
import { JwtCustomModule } from '#resources/jwt/jwt-custom.module';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { RefreshJwtAuthGuard } from './guards/jwt-refresh.guard';
import { JwtValidate } from './strategies/jwt-validate.strategy';
import { UserRoleGuard } from '#common/role/guards/role-validate.guard';

@Module({
  imports: [
    PasswordModule,
    UsersModule,
    JwtCustomModule,
    PassportModule.register(passportOption),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtValidate,
    RefreshJwtStrategy,
    UserRoleGuard,
    RefreshJwtAuthGuard,
    ValidateJwtAuthGuard,
  ],
  exports: [AuthService, ValidateJwtAuthGuard, UserRoleGuard],
})
export class AuthModule {}
