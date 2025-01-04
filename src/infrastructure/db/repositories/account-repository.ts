import { eq } from "drizzle-orm";
import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from "@/application/protocols/db/account";
import { DbConnection } from "@/infrastructure/db/connection";
import { accountSchema } from "@/infrastructure/db/schema";

export class AccountRepository implements AddAccountRepository, CheckAccountByEmailRepository, 
    LoadAccountByEmailRepository {
    
    constructor(
        private readonly dbConnection: DbConnection
    ) {}

    async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        const result = await this.dbConnection.db.insert(accountSchema).values(data);
        const insertedRows = result.rowCount ?? 0;

        return insertedRows > 0;
    }

    async checkByEmail(email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
        const result = await this.dbConnection.db
            .select({
                id: accountSchema.id
            })
            .from(accountSchema)
            .where(eq(accountSchema.email, email));
        
        return result.length > 0;
    }

    async loadByEmail(email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
        const result = await this.dbConnection.db
            .select({
                id: accountSchema.id,
                name: accountSchema.name,
                password: accountSchema.password
            })
            .from(accountSchema)
            .where(eq(accountSchema.email, email));
        
        const row = result.length > 0 ? result[0] : null;
        return row;
    }
}