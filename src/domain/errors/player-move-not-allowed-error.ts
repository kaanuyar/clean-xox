export class PlayerMoveNotAllowedError extends Error {
    constructor() {
        super('The player is not allowed to play this turn');
        this.name = 'PlayerMoveNotAllowedError';
    }
}