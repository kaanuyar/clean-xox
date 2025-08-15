import { DbContext } from '@/src/infrastructure/db/abstractions';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export class DbConnection {
    private readonly _db: DbContext;
    private readonly clientPool: Pool;
    
    constructor(dbUrl: string, dbMaxClient: number) {
        this.clientPool = new Pool({
            connectionString: dbUrl,
            max: dbMaxClient
        });

        this._db = drizzle({ client: this.clientPool, casing: 'snake_case' });
    }

    public get db(): DbContext {
        return this._db;
    }

    public async verify(): Promise<void> {
        const client = await this.clientPool.connect();
        client.release();
    }

    public async close(): Promise<void> {
        await this.clientPool.end();
    }
}