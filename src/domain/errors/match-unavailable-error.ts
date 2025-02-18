export class MatchUnavailableError extends Error {
    constructor() {
        super('The match is unavailable for joining');
        this.name = 'MatchUnavailableError';
    }
}