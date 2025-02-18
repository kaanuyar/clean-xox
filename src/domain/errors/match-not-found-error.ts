export class MatchNotFoundError extends Error {
    constructor() {
        super('The match was not found');
        this.name = 'MatchNotFoundError';
    }
}