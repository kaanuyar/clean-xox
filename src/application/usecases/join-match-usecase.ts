import { ServerError } from "@/application/errors";
import { LoadMatchWithPlayersByCodeRepository } from "@/application/protocols/db/match";
import { AddPlayerToMatchUnitOfWork } from "@/application/protocols/db/match-aggregate";
import { MatchNotFoundError } from "@/domain/errors";
import { Match } from "@/domain/entities";

export class JoinMatchUsecase {
    constructor(
        private readonly loadMatchWithPlayersByCodeRepository: LoadMatchWithPlayersByCodeRepository,
        private readonly addPlayerToMatchUnitOfWork: AddPlayerToMatchUnitOfWork
    ) {}

    async joinMatch(params: JoinMatchUsecase.Params): Promise<void> {
        const { matchCode, accountId } = params;
        const matchPlayers = await this.loadMatchWithPlayersByCodeRepository.load(matchCode);
        if (!matchPlayers) {
            throw new MatchNotFoundError();
        }

        const { match, players } = matchPlayers;

        const matchEntity = new Match(match, players);
        const createdPlayer = matchEntity.createPlayer(accountId);

        const success = await this.addPlayerToMatchUnitOfWork.addPlayer({
            match: matchEntity.state,
            matchPlayer: createdPlayer,
            skipCondition: matchEntity.playerCount === 0
        });

        if (!success) {
            throw new ServerError();
        }
    }
}

export namespace JoinMatchUsecase {
    export type Params = {
        matchCode: string,
        accountId: number
    };
}