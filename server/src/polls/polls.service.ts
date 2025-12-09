import {Injectable, Logger} from "@nestjs/common";
import {CreatePollFields, JoinPollFields, RejoinPollFields} from "./types";
import {createPollID, createUserID} from "../ids";
import {PollsRepository} from "./polls.repository";

@Injectable()
export class PollsService {
    private readonly logger = new Logger(PollsService.name);

    constructor(private readonly pollsRepository: PollsRepository) {}

    async createPoll(fields: CreatePollFields) {
        const pollID = createPollID();
        const userID = createUserID();

        const createdPoll = await this.pollsRepository.createPoll({...fields, pollID, userID});

        return {
            poll: createdPoll,
        }
    }

    async joinPoll(fields: JoinPollFields) {
        const userID = createUserID();

        this.logger.debug(`Joining poll ${fields.pollID} with userID: ${userID}`);

        const joinedPoll = await this.pollsRepository.getPoll(fields.pollID);

        return {
            poll: joinedPoll,
        }
    }

    async rejoinPoll(fields: RejoinPollFields) {
        this.logger.debug(`Rejoining poll ${fields.pollID} with userID: ${fields.userID}`);

        return await this.pollsRepository.addParticipant(fields);
    }
}