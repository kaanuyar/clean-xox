export class EmailUnregisteredError extends Error {
    constructor() {
        super('The received email is not registered');
        this.name = 'EmailUnregisteredError';
    }
}