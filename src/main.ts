import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './errorHandler/customErrorHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Register the custom exception filter
  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(3000);
}
bootstrap();
