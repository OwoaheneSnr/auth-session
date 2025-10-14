import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from './config/jtw.register';
import { JwtCustomService } from './jwt-custom.service';

@Module({
  imports: [JwtModule.register(jwtOptions)],
  providers: [JwtCustomService],
  exports: [JwtCustomService],
})
export class JwtCustomModule {}
