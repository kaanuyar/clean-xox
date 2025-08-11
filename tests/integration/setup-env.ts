import { execSync } from 'child_process'
import { Client } from 'pg';
import { env } from "@/src/entrypoint/config";
import { startServer, stopServer } from '@/src/entrypoint/api';

beforeAll(async () => {
    await setupDb();
    await setupServer();
});

afterAll(async () => {
    await stopServer();
});

const setupServer = async (): Promise<void> => {
    const port = await startServer();

    process.env.PORT = port.toString();
    env.port = port;
}

const setupDb = async (): Promise<void> => {
    const dbUrl = env.dbUrl;
    const dbName = generateRandomDbName();

    await createPostgreDb(dbUrl, dbName);

    const newDbUrl = replaceDbNameFromDbUrl(dbUrl, dbName);
    process.env.DB_URL = newDbUrl;
    env.dbUrl = newDbUrl;
    
    execSync('npm run db:migrate', { env: { ...process.env } });
}

const createPostgreDb = async (dbUrl: string, dbName: string): Promise<void> => {
    const pgClient = new Client({
        connectionString: dbUrl
    });

    await pgClient.connect();
    await pgClient.query(`CREATE DATABASE "${dbName}"`);
    await pgClient.end();
}

const generateRandomDbName = (): string => {
    return 'db_'.concat(crypto.randomUUID().replace(/-/g, ''));
}

const replaceDbNameFromDbUrl = (dbUrl: string, dbName: string): string => {
    return dbUrl.substring(0, dbUrl.lastIndexOf('/') + 1).concat(dbName);
}