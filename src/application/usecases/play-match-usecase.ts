import { MatchNotFoundError, ServerError } from "@/application/errors";
import { LoadMatchSessionByCodeRepository } from "@/application/protocols/db/match"
import { AddMoveToMatchUnitOfWork } from "@/application/protocols/db/match-aggregate";

export class PlayMatchUsecase {
    constructor(
        private readonly loadMatchSessionByCodeRepository: LoadMatchSessionByCodeRepository,
        private readonly addMoveToMatchUnitOfWork: AddMoveToMatchUnitOfWork
    ) {}
    
    async playMatch(params: PlayMatchUsecase.Params): Promise<void> {
        const { matchCode, symbolPosition, accountId } = params;
        const matchSession = await this.loadMatchSessionByCodeRepository.load(matchCode);
        if (!matchSession) {
            throw new MatchNotFoundError();
        }

        const matchMove = matchSession.play(accountId, symbolPosition);
        const match = matchSession.match;
        const skipCondition = !matchSession.isMatchOver();

        const success = await this.addMoveToMatchUnitOfWork.addMove({
            match,
            matchMove,
            skipCondition
        });

        if (!success) {
            throw new ServerError();
        }
    }
}

export namespace PlayMatchUsecase {
    export type Params = {
        symbolPosition: number,
        matchCode: string,
        accountId: string
    }
}