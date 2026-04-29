import 'dotenv/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsfilter } from './all-exceptions.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsfilter())
  app.useLogger(app.get(MyLoggerService))
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsfilter(httpAdapter))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
