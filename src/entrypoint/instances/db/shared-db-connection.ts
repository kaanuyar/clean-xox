import { DbConnection } from "@/infrastructure/db/connection";
import { env } from '@/entrypoint/config';

const dbConnection = new DbConnection(env.dbUrl, env.dbMaxClient);

export default dbConnection;