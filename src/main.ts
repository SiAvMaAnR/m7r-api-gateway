import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  const configService = app.get(ConfigService);
  const { port, allowedOrigins } = configService.get<AppConfig>('app');

  console.log(allowedOrigins);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
