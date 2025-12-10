import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIoAdapter.name);

  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const clientPort = parseInt(this.configService.get('CLIENT_PORT'));
    const LOCAL_NETWORK_IP_PATTERN = '192\\.168\\.1\\.([1-9]|[1-9]\\d)';
    const cors = {
      origin: [
        `http://localhost:${clientPort}`,
        new RegExp(`^http://${LOCAL_NETWORK_IP_PATTERN}:${clientPort}$`),
      ],
    };

    this.logger.log(`Socket.io CORS origin set to ${cors.origin}`);

    const optionsWithCors: ServerOptions = { ...options, cors };

    return super.createIOServer(port, optionsWithCors);
  }
}
