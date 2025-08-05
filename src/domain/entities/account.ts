import { AccountModel } from "@/src/domain/models";

export class Account {
    constructor(
        private readonly model: AccountModel
    ) {}

    public get id(): string { return this.model.id; }
    public get name(): string { return this.model.name; }
    public get email(): string { return this.model.email }
    public get password(): string { return this.model.password; }

    public static createNew(account: Omit<AccountModel, 'id'>): Account { 
        return new Account({
            id: crypto.randomUUID(),
            name: account.name,
            email: account.email,
            password: account.password
        });
    }
}