import { DbConnection } from "@/src/infrastructure/db/connection";
import { DbContext } from "@/src/infrastructure/db/abstractions/db-context";
import { DbTransaction } from "@/src/infrastructure/db/abstractions/db-transaction";

export abstract class Repository {
    private transaction: DbTransaction | null = null;
    
    constructor(
        private readonly dbConnection: DbConnection
    ) {}

    protected get db(): DbTransaction | DbContext {
        return this.transaction ?? this.dbConnection.db;
    }

    public setTransaction(transaction: DbTransaction) {
        this.transaction = transaction;
    }

    public clearTransaction() {
        this.transaction = null;
    }
}