import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordModule } from '@/common/resources/password/password.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '@config/envs';
import { PrismaModule } from '@config/database/prisma.module';

@Module({
  imports: [
    PasswordModule,
    JwtModule.register({
      global: true,
      secret: envs.SECRET_JWT,
      signOptions: { expiresIn: '2h' },
    }),
    PrismaModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
