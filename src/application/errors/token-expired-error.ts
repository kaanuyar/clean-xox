export class TokenExpiredError extends Error {
    constructor() {
        super('The received access token is expired');
        this.name = 'TokenExpiredError';
    }
}