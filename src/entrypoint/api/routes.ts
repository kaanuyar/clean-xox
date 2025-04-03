import { setupAuthRoutes, setupMatchRoutes } from '@/entrypoint/routes';
import { Express, Router } from 'express';

export const setupRoutes = (app: Express): void => {
    const router = Router();
    app.use('/api', router);

    setupAuthRoutes(router);
    setupMatchRoutes(router);
}