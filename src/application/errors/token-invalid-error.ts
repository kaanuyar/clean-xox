export class TokenInvalidError extends Error {
    constructor() {
        super('The received access token is invalid');
        this.name = 'TokenInvalidError';
    }
}