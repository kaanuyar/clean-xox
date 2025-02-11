import { ServerError } from "@/application/errors";
import { LoadMatchWithPlayersByCodeRepository } from "@/application/protocols/db/match";
import { AddPlayerToMatchUnitOfWork } from "@/application/protocols/db/match-aggregate";
import { MatchStateEnum, PlayerSymbolEnum } from "@/domain/models";

export class JoinMatchUsecase {
    constructor(
        private readonly loadMatchWithPlayersByCodeRepository: LoadMatchWithPlayersByCodeRepository,
        private readonly addPlayerToMatchUnitOfWork: AddPlayerToMatchUnitOfWork
    ) {}

    async joinMatch(params: JoinMatchUsecase.Params): Promise<JoinMatchUsecase.Result> {
        const { matchCode, accountId } = params;
        const matchPlayers = await this.loadMatchWithPlayersByCodeRepository.load(matchCode);
        if (!matchPlayers) {
            return { success: false, message: 'Match is not created' };
        }

        const { match, players } = matchPlayers;
        if (match.state !== MatchStateEnum.WaitingForPlayers) {
            return { success: false, message: 'Match is not available to join' };
        }

        const accountIds = players.map(player => player.accountId);
        
        if (accountIds.includes(accountId)) {
            return { success: false, message: 'Player is already in the match' }
        }

        const playerCount = accountIds.length;
        if (playerCount === 2) {
            return { success: false, message: 'All players already joined the match' }
        }

        const allPlayerSymbols = [PlayerSymbolEnum.X, PlayerSymbolEnum.O];
        const playerSymbols = players.map(player => player.playerSymbol);

        const availablePlayerSymbols = allPlayerSymbols.filter(symbol => !playerSymbols.includes(symbol));

        const success = await this.addPlayerToMatchUnitOfWork.addPlayer({
            match: {
                id: match.id,
                code: match.code,
                state: MatchStateEnum.Ongoing,
                startedAt: new Date()
            },
            matchPlayer: {
                matchId: match.id,
                accountId: accountId,
                playerSymbol: availablePlayerSymbols[0] 
            },
            skipCondition: playerCount === 0
        });

        if (!success) {
            throw new ServerError();
        }
        
        return { success: true, message: 'Successfully joined' };
    }
}

export namespace JoinMatchUsecase {
    export type Params = {
        matchCode: string,
        accountId: number
    };
    export type Result = {
        success: boolean,
        message: string
    };
}