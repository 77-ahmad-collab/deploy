import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  console.log('app is listening on port 3000');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
