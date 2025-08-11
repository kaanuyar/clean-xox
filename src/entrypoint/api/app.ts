import express, { Express } from 'express';
import { setupMiddlewares } from '@/src/entrypoint/api/middlewares';
import { setupRoutes } from '@/src/entrypoint/api/routes';
import { setupSwagger } from '@/src/entrypoint/api/swagger';

let app: Express | null = null;

export const getApp = (): Express => {
    if (!app) {
        app = express();
        setupSwagger(app);
        setupMiddlewares(app);
        setupRoutes(app);
    }
    
    return app;
}