import 'dotenv/config'
import env from './src/entrypoint/config/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/infrastructure/db/schema',
    out: './src/infrastructure/db/migrations',
    dbCredentials: {
        url: env.dbUrl,
        ssl: false
    }
});