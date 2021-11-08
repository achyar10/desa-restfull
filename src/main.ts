import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port: number = parseInt(`${process.env.PORT}`) || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  await app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
bootstrap();
