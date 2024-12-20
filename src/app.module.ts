import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const rootPath = join(__dirname, '..', 'public');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath,
      exclude: ['/api/(.*)'],
      serveRoot: rootPath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
