import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

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
  const outputPath = join(__dirname, '..', 'public', 'openapi.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2));
  app.useStaticAssets(join(__dirname, '..', 'public')); // Call after writing to path

  const port = 3000;
  await app.listen(port);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Application is running on: http://127.0.0.1:${port}`);
  }
}
bootstrap();
