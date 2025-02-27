export class InvalidBoardPositionError extends Error {
    constructor() {
        super('The board position is invalid');
        this.name = 'InvalidBoardPositionError';
    }
}