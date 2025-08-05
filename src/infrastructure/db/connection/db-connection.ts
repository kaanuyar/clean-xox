import { DbContext } from '@/src/infrastructure/db/abstractions';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export class DbConnection {
    private readonly _db: DbContext;
    
    constructor(dbUrl: string, dbMaxClient: number) {
        const pool = new Pool({
            connectionString: dbUrl,
            max: dbMaxClient
        });

        this._db = drizzle({ client: pool, casing: 'snake_case' });
    }

    public get db(): DbContext {
        return this._db;
    }
}