import { DbConnection } from "@/src/infrastructure/db/connection";
import { env } from '@/src/entrypoint/config';

let dbConnection: DbConnection | null = null; 

export const getDbConnection = (): DbConnection => {
    if (!dbConnection) {
        dbConnection = new DbConnection(env.dbUrl, env.dbMaxClient);
    }
    
    return dbConnection;
}

export const checkDbConnection = async (): Promise<void> => {
    if (!dbConnection) {
        return;
    }
    
    await dbConnection.verify();
}

export const closeDbConnection = async (): Promise<void> => {
    if (!dbConnection) {
        return;
    }

    await dbConnection.close();
    dbConnection = null;
}