import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './dtos';
import { PollsService } from './polls.service';
import { ControllerAuthGuard } from './controller-auth.guard';
import { RequestWithAuth } from './types';

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
  @UseGuards(ControllerAuthGuard)
  rejoin(@Req() request: RequestWithAuth) {
    return this.pollsService.rejoinPoll({
      name: request.name,
      pollID: request.pollID,
      userID: request.userID,
    });
  }
}
