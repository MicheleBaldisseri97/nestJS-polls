import {Body, Controller, Logger, Post} from "@nestjs/common";
import {CreatePollDto, JoinPollDto} from "./dtos";

@Controller('polls')
export class PollsController {
    @Post()
    create(@Body() createPollDto: CreatePollDto) {
        Logger.log('in create')
        return createPollDto;
    }

    @Post('/join')
    join(@Body() joinPollDto: JoinPollDto) {
        Logger.log('in join')
        return joinPollDto;
    }

    @Post('/rejoin')
    rejoin() {
        Logger.log('in rejoin')
    }
}