import { z } from 'zod'

const envSchema = z.object({
    MONGO_URL: z.string().url(),
    PORT: z.coerce.number(),
    JWT_SECRET: z.string(),
    DB_URL: z.string().url()
}).transform(obj => ({
    mongoUrl: obj.MONGO_URL,
    port: obj.PORT,
    jwtSecret: obj.JWT_SECRET,
    dbUrl: obj.DB_URL
}));

const env = envSchema.parse(process.env);

export default env;