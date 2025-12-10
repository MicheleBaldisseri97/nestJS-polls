import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketIoAdapter } from './socket-io-adapter';

async function bootstrap() {
  const logger = new Logger('Main (main.ts)');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const clientPort = parseInt(configService.get('CLIENT_PORT'));
  const port = parseInt(configService.get('PORT'));
  const LOCAL_NETWORK_IP_PATTERN = '192\\.168\\.1\\.([1-9]|[1-9]\\d)';

  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      new RegExp(`^http://${LOCAL_NETWORK_IP_PATTERN}:${clientPort}$`),
    ],
  });
  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));

  await app.listen(port);

  logger.log(`Server running on port ${port}`);
}
bootstrap();
