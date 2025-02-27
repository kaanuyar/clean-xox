export class InvalidTurnError extends Error {
    constructor() {
        super('The turn is invalid');
        this.name = 'InvalidTurnError';
    }
}