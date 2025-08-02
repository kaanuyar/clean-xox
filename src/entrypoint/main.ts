import 'module-alias/register';
import 'dotenv/config';
import { startServer } from '@/entrypoint/api';
import { env } from '@/entrypoint/config';

startServer(env.port);