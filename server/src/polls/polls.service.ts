import {Injectable} from "@nestjs/common";
import {CreatePollFields, JoinPollFields, RejoinPollFields} from "./types";
import {createPollID, createUserID} from "../ids";

@Injectable()
export class PollsService {
    createPoll(fields: CreatePollFields) {
        const pollID = createPollID();
        const userID = createUserID();

        return {
            ...fields,
            pollID,
            userID
        }
    }

    joinPoll(fields: JoinPollFields) {
        const userID = createUserID();

        return {
            ...fields,
            userID
        }
    }

    rejoinPoll(fields: RejoinPollFields) {
        return fields;
    }
}