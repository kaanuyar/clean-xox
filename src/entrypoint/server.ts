import 'module-alias/register'
import 'dotenv/config'
import env from '@/entrypoint/config/env'
import app from '@/entrypoint/api/app'
import { mongoSetup } from '@/entrypoint/factories/db'

const run = async (): Promise<void> => {
    await mongoSetup();
    app.listen(env.port, () => console.log(`server is running at http://localhost:${env.port}`));
}

run();