import { MatchStateEnum, PlayerSymbolEnum } from "@/domain/constants";
import { MatchFullError, MatchUnavailableError, PlayerInMatchError } from "@/domain/errors";
import { MatchModel, MatchPlayerModel } from "@/domain/models";

export class Match {
    constructor(
        private match: MatchModel,
        private matchPlayers: MatchPlayerModel[] = []
    ) {}

    public createPlayer(accountId: string): MatchPlayerModel {
        if (this.match.state !== MatchStateEnum.WaitingForPlayers) {
            throw new MatchUnavailableError();
        }

        const accountIds = this.matchPlayers.map(player => player.accountId);
        if (accountIds.includes(accountId)) {
            throw new PlayerInMatchError();
        }

        const playerCount = accountIds.length;
        if (playerCount === 2) {
            throw new MatchFullError();
        }

        const allPlayerSymbols = [PlayerSymbolEnum.X, PlayerSymbolEnum.O];
        const playerSymbols = this.matchPlayers.map(player => player.playerSymbol);

        const availablePlayerSymbols = allPlayerSymbols.filter(symbol => !playerSymbols.includes(symbol));

        this.match = {
            id: this.match.id,
            code: this.match.code,
            state: MatchStateEnum.Ongoing,
            startedAt: new Date()
        };

        return {
            matchId: this.match.id,
            accountId: accountId,
            playerSymbol: availablePlayerSymbols[0] 
        };
    }

    public get state(): MatchModel {
        return this.match;
    }

    public get playerCount(): number {
        return this.matchPlayers.length;
    }
}