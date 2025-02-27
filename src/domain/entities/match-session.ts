import { MatchFullError, MatchUnavailableError, PlayerInMatchError, PlayerNotInMatchError } from "@/domain/errors";
import { MatchStateEnum, PlayerSymbol, PlayerSymbolEnum } from "@/domain/constants";
import { GameBoard } from "@/domain/entities/game-board";
import { Match } from "@/domain/entities/match";
import { MatchMove } from "@/domain/entities/match-move";
import { MatchPlayer } from "@/domain/entities/match-player";

export class MatchSession {
    private readonly playerLimit: number = 2;
    
    constructor(
        private readonly _match: Match,
        private readonly _matchPlayers: MatchPlayer[],
        private readonly _matchMoves: MatchMove[]
    ) {}

    public get match(): Match { return this._match; }
    public get matchPlayers(): MatchPlayer[] { return this._matchPlayers; }
    public get matchMoves(): MatchMove[] { return this._matchMoves; }

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

        const gameBoard = new GameBoard(this.matchMoves);
        gameBoard.playMove(matchPlayer.playerSymbol, symbolPosition);

        const matchMove = new MatchMove({
            matchId: this.match.id,
            accountId,
            turn: gameBoard.turn,
            symbolPosition,
            movedAt: new Date()
        });
        this.matchMoves.push(matchMove);

        const gameResult = gameBoard.getGameResult();
        if (gameResult) {
            this.match.finish(gameResult);
        }

        return matchMove;
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