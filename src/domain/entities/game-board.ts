import { BoardPositionUsedError, InvalidBoardPositionError, InvalidTurnError, PlayerMoveNotAllowedError } from "@/domain/errors";
import { MatchResult, MatchResultEnum, PlayerSymbol, PlayerSymbolEnum } from "@/domain/constants";
import { MatchMove } from "@/domain/entities/match-move";

type BoardTile = PlayerSymbol | null;
type Board = BoardTile[];

export class GameBoard {
    private readonly minTurn: number = 0;
    private readonly maxTurn: number = 9;
    private readonly boardFirstPosition: number = 0;
    private readonly boardLastPosition: number = 8;
    private readonly boardSize: number = 9;

    private _board: Board = Array<BoardTile>(this.boardSize).fill(null);
    private _turn: number = this.minTurn;
    
    constructor(matchMoves: MatchMove[]) {
        this.initializeBoard(matchMoves);
        this.initializeTurn(matchMoves);
    }

    public get board(): Board { return this._board; }
    public get turn(): number { return this._turn; }

    private set board(board: Board) { this._board = board; }
    private set turn(turn: number) {
        if (turn < this.minTurn || turn > this.maxTurn) {
            throw new InvalidTurnError();
        }

        this._turn = turn;
    }

    public playMove(playerSymbol: PlayerSymbol, symbolPosition: number): void {
        if (playerSymbol !== this.getPlayerSymbolForNextTurn()) {
            throw new PlayerMoveNotAllowedError();
        }

        if (this.getPlayerSymbol(symbolPosition)) {
            throw new BoardPositionUsedError();
        }

        this.setPlayerSymbol(playerSymbol, symbolPosition);
        this.turn++;
    }

    public getGameResult(): MatchResult | null {
        const winningPlayer = this.findWinningPlayer();
        if (winningPlayer) {
            return winningPlayer;
        }
        
        if (this.turn === this.maxTurn) {
            return MatchResultEnum.Draw;
        }
        
        return null;
    }

    public getPlayerSymbolForNextTurn(): PlayerSymbol {
        return this.getPlayerSymbolForTurn(this.turn + 1);
    }

    private findWinningPlayer(): PlayerSymbol | null {
        const winningPositions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],    // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8],    // vertical
            [0, 4, 8], [2, 4, 6]                // diagonal
        ];
        
        for (const winningLine of winningPositions) {
            const playerSymbols = this.getPlayerSymbolsForLine(winningLine);
            const winnerExists = playerSymbols.every(symbol => symbol === playerSymbols[0] && symbol !== null);

            if (winnerExists) {
                return playerSymbols[0];
            }
        }

        return null;
    }

    private initializeBoard(matchMoves: MatchMove[]): void {
        for (const matchMove of matchMoves) {
            const symbolPosition = matchMove.symbolPosition;
            const playerSymbol = this.getPlayerSymbolForTurn(matchMove.turn);

            this.setPlayerSymbol(playerSymbol, symbolPosition)
        }
    }

    private initializeTurn(matchMoves: MatchMove[]): void {
        const currentTurn = Math.max(...matchMoves.map(matchMove => matchMove.turn));
        if (currentTurn > 0) {
            this.turn = currentTurn;
        }
    }

    private getPlayerSymbolsForLine(symbolPositions: number[]): BoardTile[] {
        const playerSymbols: BoardTile[] = [];

        for (const symbolPosition of symbolPositions) {
            playerSymbols.push(this.getPlayerSymbol(symbolPosition));
        }

        return playerSymbols;
    }

    private getPlayerSymbol(symbolPosition: number): BoardTile {
        if (symbolPosition < this.boardFirstPosition || symbolPosition > this.boardLastPosition) {
            throw new InvalidBoardPositionError();
        }

        return this.board[symbolPosition];
    }

    private setPlayerSymbol(playerSymbol: PlayerSymbol, symbolPosition: number): void {
        if (symbolPosition < this.boardFirstPosition || symbolPosition > this.boardLastPosition) {
            throw new InvalidBoardPositionError();
        }

        this.board[symbolPosition] = playerSymbol;
    }

    private getPlayerSymbolForTurn(turn: number): PlayerSymbol {
        return turn % 2 === 1 ? PlayerSymbolEnum.X : PlayerSymbolEnum.O;
    }
}