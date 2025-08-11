import { DbConnection } from "@/src/infrastructure/db/connection";
import { env } from '@/src/entrypoint/config';

let dbConnection: DbConnection | null = null; 

export const getDbConnection = (): DbConnection => {
    if (!dbConnection) {
        return new DbConnection(env.dbUrl, env.dbMaxClient);
    }
    
    return dbConnection;
}