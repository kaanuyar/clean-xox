import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from "@/application/abstractions/db/account";
import { Account } from "@/domain/entities";
import { DbConnection } from "@/infrastructure/db/connection";
import { Repository } from "@/infrastructure/db/abstractions";
import { accountSchema } from "@/infrastructure/db/schema/tables";
import { eq } from "drizzle-orm";

export class AccountRepository extends Repository implements AddAccountRepository, CheckAccountByEmailRepository, 
    LoadAccountByEmailRepository {
    
    constructor(dbConnection: DbConnection) {
        super(dbConnection);
    }

    public async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        const result = await this.db
            .insert(accountSchema)
            .values({
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password
            })
            .returning();
        
        const account = result.length > 0 ? new Account(result[0]) : null;
        return account;
    }

    public async checkByEmail(email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
        const result = await this.db
            .select({ id: accountSchema.id })
            .from(accountSchema)
            .where(eq(accountSchema.email, email));
        
        return result.length > 0;
    }

    public async loadByEmail(email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
        const result = await this.db
            .select({
                id: accountSchema.id,
                email: accountSchema.email,
                name: accountSchema.name,
                password: accountSchema.password
            })
            .from(accountSchema)
            .where(eq(accountSchema.email, email));
        
        const account = result.length > 0 ? new Account(result[0]) : null;
        return account;
    }
}