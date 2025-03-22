import { BoardPositionUsedError, InvalidBoardPositionError } from "@/domain/errors";
import { PlayerSymbol } from "@/domain/constants";

export type BoardTile = PlayerSymbol | null;

export class Board {
    private readonly boardSize: number = 9;
    private readonly firstTilePosition: number = 0;
    private readonly lastTilePosition: number = 8;

    private _tiles: BoardTile[] = Array<BoardTile>(this.boardSize).fill(null);

    public get tiles(): BoardTile[] { return this._tiles; }
    private set tiles(tiles: BoardTile[]) { this._tiles = tiles; }

    public findWinningSymbol(): PlayerSymbol | null {
        const winningPositions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],    // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8],    // vertical
            [0, 4, 8], [2, 4, 6]                // diagonal
        ];
        
        for (const winningLine of winningPositions) {
            const symbols = this.getSymbolsForLine(winningLine);
            const winnerExists = symbols.every(symbol => symbol === symbols[0] && symbol !== null);

            if (winnerExists) {
                return symbols[0];
            }
        }

        return null;
    }

    public getSymbolForPosition(position: number): BoardTile {
        if (position < this.firstTilePosition || position > this.lastTilePosition) {
            throw new InvalidBoardPositionError();
        }

        return this.tiles[position];
    }

    public setSymbolForPosition(symbol: PlayerSymbol, position: number): void {
        if (position < this.firstTilePosition || position > this.lastTilePosition) {
            throw new InvalidBoardPositionError();
        }

        if (this.getSymbolForPosition(position)) {
            throw new BoardPositionUsedError();
        }

        this.tiles[position] = symbol;
    }

    private getSymbolsForLine(positions: number[]): BoardTile[] {
        const symbols: BoardTile[] = [];

        for (const position of positions) {
            symbols.push(this.getSymbolForPosition(position));
        }

        return symbols;
    }
}