import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number(),
    JWT_SECRET: z.string(),
    DB_URL: z.string().url(),
    DB_MAX_CLIENT: z.coerce.number()
}).transform(obj => ({
    port: obj.PORT,
    jwtSecret: obj.JWT_SECRET,
    dbUrl: obj.DB_URL,
    dbMaxClient: obj.DB_MAX_CLIENT
}));

const env = envSchema.parse(process.env);

export default env;