import { DbConnection } from "@/src/infrastructure/db/connection";
import { env } from '@/src/entrypoint/config';

const dbConnection = new DbConnection(env.dbUrl, env.dbMaxClient);

export default dbConnection;