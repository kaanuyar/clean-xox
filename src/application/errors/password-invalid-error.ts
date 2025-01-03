export class PasswordInvalidError extends Error {
    constructor() {
        super('The received password is invalid');
        this.name = 'PasswordInvalidError';
    }
}