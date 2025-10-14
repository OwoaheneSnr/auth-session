import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '#config/prisma/prisma.module';
import { PasswordModule } from '#resources/password/password.module';
import { AuthModule } from '#modules/auth/auth.module';
import { THROTTLER_OPTIONS } from '#config/throttlers.config';
import { CookiesModule } from '#resources/cookies/cookies.module';
import { JwtCustomModule } from '#resources/jwt/jwt-custom.module';
import { UsersModule } from '#modules/users/users.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
    // * Global Modules
    ThrottlerModule.forRoot(THROTTLER_OPTIONS),
    PrismaModule,
    CookiesModule,
    JwtCustomModule,
    PasswordModule,

    // * Modules of my App
    SeedModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
