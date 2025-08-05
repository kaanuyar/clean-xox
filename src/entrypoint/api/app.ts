import express, { Express } from 'express';
import { setupMiddlewares } from '@/src/entrypoint/api/middlewares';
import { setupRoutes } from '@/src/entrypoint/api/routes';
import { setupSwagger } from '@/src/entrypoint/api/swagger';

const app = express();

const setup = (app: Express): void => {
    setupSwagger(app);
    setupMiddlewares(app);
    setupRoutes(app);
}

setup(app);

export default app;