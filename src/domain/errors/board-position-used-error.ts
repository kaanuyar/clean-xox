export class BoardPositionUsedError extends Error {
    constructor() {
        super('The board position is already used');
        this.name = 'BoardPositionUsedError';
    }
}