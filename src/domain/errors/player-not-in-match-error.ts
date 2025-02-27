export class PlayerNotInMatchError extends Error {
    constructor() {
        super('The player is not part of this match');
        this.name = 'PlayerNotInMatchError';
    }
}