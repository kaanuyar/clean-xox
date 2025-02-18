export class PlayerInMatchError extends Error {
    constructor() {
        super('The player has already joined the match');
        this.name = 'PlayerInMatchError';
    }
}