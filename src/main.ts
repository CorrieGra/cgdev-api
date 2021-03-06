/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie_parser from 'cookie-parser';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookie_parser(process.env.APP_DEFAULT_COOKIE_SECRET));

  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    origin: process.env.CORS_ENVIRONTMENT_ORIGIN,
    credentials: true
  });

  await app.listen(process.env.APP_DEFAULT_PORT || 3000);
}

bootstrap();
