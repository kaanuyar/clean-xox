import { MatchStateEnum, PlayerSymbol, PlayerSymbolEnum } from "@/domain/constants";
import { Match } from "@/domain/entities/match";
import { MatchPlayer } from "@/domain/entities/match-player";
import { MatchFullError, MatchUnavailableError, PlayerInMatchError } from "@/domain/errors";

export class MatchSession {
    private readonly playerLimit: number = 2;
    
    constructor(
        private readonly _match: Match,
        private readonly _matchPlayers: MatchPlayer[] = []
    ) {}

    public get match(): Match { return this._match; }
    public get matchPlayers(): MatchPlayer[] { return this._matchPlayers; }

    public join(accountId: string): MatchPlayer {
        if (this.match.state !== MatchStateEnum.WaitingForPlayers) {
            throw new MatchUnavailableError();
        }

        const isAccountInMatch = this.matchPlayers.some(player => player.accountId === accountId);
        if (isAccountInMatch) {
            throw new PlayerInMatchError();
        }

        if (this.isMatchFull()) {
            throw new MatchFullError();
        }
        
        const playerSymbol = this.getAvailableSymbol();
        const matchPlayer = new MatchPlayer({
            matchId: this.match.id,
            accountId: accountId,
            playerSymbol: playerSymbol,
            joinedAt: new Date()
        });

        this.matchPlayers.push(matchPlayer);
        if (this.isMatchFull()) {
            this.match.start();
        }

        return matchPlayer;
    }

    public isMatchFull(): boolean {
        return this.playerLimit === this.playerCount();
    }

    private playerCount(): number {
        return this.matchPlayers.length;
    }

    private getAvailableSymbol(): PlayerSymbol {
        const playerSymbolValues = Object.values(PlayerSymbolEnum);
        const matchPlayerSymbols = this.matchPlayers.map(player => player.playerSymbol);
        const availablePlayerSymbols = playerSymbolValues.filter(symbol => !matchPlayerSymbols.includes(symbol));
        if (availablePlayerSymbols.length === 0) {
            throw new MatchFullError();
        }

        return availablePlayerSymbols[0];
    }
}