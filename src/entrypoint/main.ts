import 'module-alias/register';
import 'dotenv/config';
import { startServer } from '@/src/entrypoint/api';
import { env } from '@/src/entrypoint/config';

startServer(env.port);