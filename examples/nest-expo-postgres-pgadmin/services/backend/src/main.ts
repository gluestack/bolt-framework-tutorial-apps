import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:19006', 
  });
  await app.listen(process.env.ASSIGNED_PORT);
}
bootstrap();
