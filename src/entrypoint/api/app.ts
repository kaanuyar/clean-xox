import express from 'express'
import setupMiddlewares from '@/entrypoint/api/middlewares'
import setupRoutes from '@/entrypoint/api/routes'

const app = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;