import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { envs } from '../envs';

export function setupSwagger(app: INestApplication, prefix: string = '') {
  const logger = new Logger('NestApplication');

  // * Swagger - Only in Development
  const isProduction = envs.NODE_ENV === 'production';

  if (!isProduction) {
    const config = new DocumentBuilder()
      .addServer(`http://localhost:${envs.PORT_SERVER}`)
      .setTitle('system-auth-nestjs')
      .setDescription('The system-auth-nestjs API description')
      .setVersion('1.0')
      .addTag('auth')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    // Serve Swagger UI at /api and JSON spec at /api-json
    SwaggerModule.setup('swagger', app, document, {
      jsonDocumentUrl: '/api-json',
    });
    app.use('/api-json', (_req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(document);
    });

    logger.log(`Swagger URL: http://localhost:${envs.PORT_SERVER}/swagger`);
  }
}
