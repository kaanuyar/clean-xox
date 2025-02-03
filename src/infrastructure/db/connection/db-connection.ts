import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export class DbConnection {
    private readonly _db: NodePgDatabase;
    
    constructor(dbUrl: string, dbMaxClient: number) {
        const pool = new Pool({
            connectionString: dbUrl,
            max: dbMaxClient
        });

        this._db = drizzle({ client: pool, casing: 'snake_case' });
    }

    public get db() {
        return this._db;
    }
}