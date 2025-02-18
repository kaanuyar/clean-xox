export class MatchFullError extends Error {
    constructor() {
        super('The match is full and cannot accept more players');
        this.name = 'MatchFullError';
    }
}