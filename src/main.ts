import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { envs } from '#config/envs';
import { setupSwagger } from '#config/swagger/swagger.dev';
import express from 'express';

async function bootstrap() {
  // * APP CONFIG
  const app = await NestFactory.create(AppModule);
  const prefix = 'api';
  // * Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: false,
    }),
  );

  app.setGlobalPrefix(prefix);
  app.use(express.urlencoded({ extended: true }));

  // * Cookies
  app.use(cookieParser());
  setupSwagger(app, prefix);
  // * LISTEN
  await app.listen(envs.PORT_SERVER);
}
bootstrap();
