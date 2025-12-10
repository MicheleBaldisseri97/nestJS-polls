import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { PollsService } from './polls.service';

@WebSocketGateway({ namespace: 'polls' })
export class PollsGateway implements OnGatewayInit {
  private readonly logger = new Logger(PollsGateway.name);

  constructor(private readonly pollsService: PollsService) {}

  afterInit(server) {
    this.logger.log('Initialized websocket server');
  }
}
