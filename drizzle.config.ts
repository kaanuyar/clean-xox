import 'dotenv/config'
import env from './src/entrypoint/config/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: [
        './src/infrastructure/db/schema/tables', 
        './src/infrastructure/db/schema/enums'
    ],
    out: './src/infrastructure/db/migrations',
    casing: 'snake_case',
    dbCredentials: {
        url: env.dbUrl,
        ssl: false
    }
});