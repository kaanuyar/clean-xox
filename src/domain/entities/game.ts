import { MatchResult, MatchResultEnum, PlayerSymbol, PlayerSymbolEnum } from "@/src/domain/constants";
import { PlayerMoveNotAllowedError } from "@/src/domain/errors";
import { MatchMove } from "@/src/domain/entities/match-move";
import { Turn } from "@/src/domain/entities/turn";
import { Board } from "@/src/domain/entities/board";

export class Game {
    private _board: Board;
    private _turn: Turn;
    
    constructor(matchMoves: MatchMove[]) {
        this._board = this.initializeBoard(matchMoves);
        this._turn = this.initializeTurn(matchMoves);
    }

    public get board(): Board { return this._board; }
    public get turn(): Turn { return this._turn; }

    private initializeBoard(matchMoves: MatchMove[]): Board {
        const board = new Board();
        
        for (const matchMove of matchMoves) {
            const symbol = this.getSymbolForTurn(matchMove.turn);
            const position = matchMove.symbolPosition;

            board.setSymbolForPosition(symbol, position);
        }

        return board;
    }

    private initializeTurn(matchMoves: MatchMove[]): Turn {
        if (matchMoves.length > 0) {
            const turnValue = Math.max(...matchMoves.map(matchMove => matchMove.turn));
            return new Turn(turnValue);    
        } else {
            return new Turn();
        }
    }

    public playMove(playerSymbol: PlayerSymbol, symbolPosition: number): void {
        if (playerSymbol !== this.getSymbolForNextTurn()) {
            throw new PlayerMoveNotAllowedError();
        }

        this.board.setSymbolForPosition(playerSymbol, symbolPosition);
        this.turn.value++;
    }

    public getResult(): MatchResult | null {
        const winningSymbol = this.board.findWinningSymbol();
        if (winningSymbol) {
            return winningSymbol;
        }
        
        if (this.turn.isLast()) {
            return MatchResultEnum.Draw;
        }
        
        return null;
    }

    public getSymbolForNextTurn(): PlayerSymbol {
        return this.getSymbolForTurn(this.turn.value + 1);
    }

    private getSymbolForTurn(turn: number): PlayerSymbol {
        return turn % 2 === 1 ? PlayerSymbolEnum.X : PlayerSymbolEnum.O;
    }
}