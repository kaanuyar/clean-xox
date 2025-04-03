import { z } from 'zod'

const coerceBool = z
    .enum(['true', 'false'])
    .transform((value) => value === 'true');

const envSchema = z.object({
    PORT: z.coerce.number(),
    JWT_SECRET: z.string(),
    DB_URL: z.string().url(),
    DB_MAX_CLIENT: z.coerce.number(),
    JSON_LOG_ENABLE: coerceBool
}).transform(obj => ({
    port: obj.PORT,
    jwtSecret: obj.JWT_SECRET,
    dbUrl: obj.DB_URL,
    dbMaxClient: obj.DB_MAX_CLIENT,
    jsonLogEnable: obj.JSON_LOG_ENABLE
}));

const env = envSchema.parse(process.env);

export default env;