import { MatchFullError, MatchUnavailableError, PlayerInMatchError, PlayerNotInMatchError } from "@/domain/errors";
import { MatchStateEnum, PlayerSymbol, PlayerSymbolEnum } from "@/domain/constants";
import { Match } from "@/domain/entities/match";
import { MatchMove } from "@/domain/entities/match-move";
import { MatchPlayer } from "@/domain/entities/match-player";
import { Game } from "@/domain/entities/game";

export class MatchSession {
    private readonly playerLimit: number = 2;
    
    private readonly _game: Game;

    constructor(
        private readonly _match: Match,
        private readonly _matchPlayers: MatchPlayer[],
        private readonly _matchMoves: MatchMove[]
    ) {
        this._game = new Game(this.matchMoves);
    }

    public get match(): Match { return this._match; }
    public get matchPlayers(): MatchPlayer[] { return this._matchPlayers; }
    public get matchMoves(): MatchMove[] { return this._matchMoves; }
    public get game(): Game { return this._game; }

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

    public play(accountId: string, symbolPosition: number): MatchMove {
        if (this.match.state !== MatchStateEnum.Ongoing) {
            throw new MatchUnavailableError();
        }

        const matchPlayer = this.matchPlayers.find(player => player.accountId === accountId);
        if (!matchPlayer) {
            throw new PlayerNotInMatchError();
        }

        this.game.playMove(matchPlayer.playerSymbol, symbolPosition);

        const matchMove = new MatchMove({
            matchId: this.match.id,
            accountId,
            turn: this.game.turn.value,
            symbolPosition,
            movedAt: new Date()
        });
        this.matchMoves.push(matchMove);

        const gameResult = this.game.getResult();
        if (gameResult) {
            this.match.finish(gameResult);
        }

        return matchMove;
    }

    public getSymbolToPlay(): PlayerSymbol | null {
        return !this.isMatchOver() ? this.game.getSymbolForNextTurn() : null;
    }

    public isMatchStarted(): boolean {
        return this.match.state !== MatchStateEnum.WaitingForPlayers;
    }

    public isMatchOver(): boolean {
        return this.match.state === MatchStateEnum.Finished && this.match.result !== null;
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