import env from "@/entrypoint/config/env";
import { DbConnection } from "@/infrastructure/db/connection/db-connection";

let dbConnection: DbConnection | null = null;

export const makeDbConnection = (): DbConnection => {
    if (!dbConnection) {
        dbConnection = new DbConnection(env.dbUrl, env.dbMaxClient);
    }
    
    return dbConnection;
}