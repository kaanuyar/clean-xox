import { ServerError } from "@/application/errors";
import { AddMatchPlayerRepository, LoadMatchPlayersByCodeRepository, UpdateMatchByCodeRepository } from "@/application/protocols/db/match";
import { MatchStateEnum, PlayerSymbolEnum } from "@/domain/models";

export class JoinMatchUsecase {
    constructor(
        private readonly loadMatchPlayersByCodeRepository: LoadMatchPlayersByCodeRepository,
        private readonly addMatchPlayerRepository: AddMatchPlayerRepository,
        private readonly updateMatchByCodeRepository: UpdateMatchByCodeRepository
    ) {}

    async joinMatch(params: JoinMatchUsecase.Params): Promise<JoinMatchUsecase.Result> {
        const { matchCode, accountId } = params;
        const matchPlayers = await this.loadMatchPlayersByCodeRepository.load(matchCode);
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
        
        const createdMatchPlayer = await this.addMatchPlayerRepository.addMatchPlayer({
            matchId: match.id,
            accountId: accountId,
            playerSymbol: availablePlayerSymbols[0]
        });

        if (!createdMatchPlayer) {
            throw new ServerError();
        }

        if (playerCount === 1) {
            const updatedMatch = await this.updateMatchByCodeRepository.updateMatch({
                code: matchCode,
                state: MatchStateEnum.Ongoing,
                startedAt: new Date()
            });

            if (!updatedMatch) {
                throw new ServerError();
            }
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