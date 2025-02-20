import { MatchNotFoundError, ServerError } from "@/application/errors";
import { LoadMatchWithPlayersByCodeRepository } from "@/application/protocols/db/match";
import { AddPlayerToMatchUnitOfWork } from "@/application/protocols/db/match-aggregate";

export class JoinMatchUsecase {
    constructor(
        private readonly loadMatchWithPlayersByCodeRepository: LoadMatchWithPlayersByCodeRepository,
        private readonly addPlayerToMatchUnitOfWork: AddPlayerToMatchUnitOfWork
    ) {}

    async joinMatch(params: JoinMatchUsecase.Params): Promise<void> {
        const { matchCode, accountId } = params;
        const matchSession = await this.loadMatchWithPlayersByCodeRepository.load(matchCode);
        if (!matchSession) {
            throw new MatchNotFoundError();
        }

        const matchPlayer = matchSession.join(accountId);
        const match = matchSession.match;
        const skipCondition = !matchSession.isMatchFull();

        const success = await this.addPlayerToMatchUnitOfWork.addPlayer({
            match,
            matchPlayer,
            skipCondition
        });

        if (!success) {
            throw new ServerError();
        }
    }
}

export namespace JoinMatchUsecase {
    export type Params = {
        matchCode: string,
        accountId: string
    };
}