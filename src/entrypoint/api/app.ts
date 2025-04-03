import express, { Express } from 'express';
import { setupMiddlewares } from '@/entrypoint/api/middlewares';
import { setupRoutes } from '@/entrypoint/api/routes';
import { setupSwagger } from '@/entrypoint/api/swagger';

const app = express();

const setup = (app: Express): void => {
    setupSwagger(app);
    setupMiddlewares(app);
    setupRoutes(app);
}

setup(app);

export default app;