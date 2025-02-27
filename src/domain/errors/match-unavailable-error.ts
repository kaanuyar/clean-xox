export class MatchUnavailableError extends Error {
    constructor() {
        super('The match is unavailable');
        this.name = 'MatchUnavailableError';
    }
}