import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  // Set EJS as the default view engine
  app.setViewEngine('ejs'); // Replace 'ejs' with your view engine of choice
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(3000);
}

bootstrap();
