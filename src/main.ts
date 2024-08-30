import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { InfoObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  const md_access_tokens = readFileSync(
    join(__dirname, '..', 'public', 'AccessTokens.md'),
  );

  const config = new DocumentBuilder()
    .setTitle('API Demo')
    .setDescription('API Demo')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        description: md_access_tokens.toString('utf8'),
      },
      'Bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.info = {
    ...document.info,
    'x-logo': {
      url: './company-logo.jpg',
      altText: 'Company Logo',
    },
  } as InfoObject;

  app.use('/api-spec', (_: Request, res: Response) => res.json(document));
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const port = 3000;
  await app.listen(port);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Application is running on: http://127.0.0.1:${port}`);
  }
}
bootstrap();
