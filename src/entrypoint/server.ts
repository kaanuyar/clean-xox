import 'module-alias/register'
import app from '@/entrypoint/api/app'
import env from '@/entrypoint/api/env'
import { mongoSetup } from '@/entrypoint/factories/db'

const run = async (): Promise<void> => {
    await mongoSetup();
    app.listen(env.port, () => console.log(`server is running at http://localhost:${env.port}`));
}

run();