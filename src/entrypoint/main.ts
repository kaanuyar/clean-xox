import 'module-alias/register';
import 'dotenv/config';
import { logger } from '@/entrypoint/instances/logging';
import { env } from '@/entrypoint/config';
import { app } from '@/entrypoint/api';


app.listen(env.port, () => logger.info(`server is running at http://localhost:${env.port}`));