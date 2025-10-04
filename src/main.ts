import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './common/config/envs';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@resources/errors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(envs.PORT_SERVER);
}
bootstrap();
