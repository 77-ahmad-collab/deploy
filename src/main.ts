import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 5000;
  console.log('app is listening on port 5000');
  console.log(process.env.PORT);
  await app.listen(PORT);
}
bootstrap();
