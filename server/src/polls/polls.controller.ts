import { Body, Controller, Post } from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './dtos';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {
  constructor(private pollsService: PollsService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollsService.createPoll(createPollDto);
  }

  @Post('/join')
  join(@Body() joinPollDto: JoinPollDto) {
    return this.pollsService.joinPoll(joinPollDto);
  }

  @Post('/rejoin')
  rejoin() {
    return this.pollsService.rejoinPoll({
      name: 'from token',
      pollID: 'from token',
      userID: 'from token',
    });
  }
}
