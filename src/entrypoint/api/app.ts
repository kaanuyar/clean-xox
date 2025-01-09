import express from 'express'
import setupMiddlewares from '@/entrypoint/api/middlewares'
import setupRoutes from '@/entrypoint/api/routes'
import setupSwagger from '@/entrypoint/api/swagger'

const app = express();
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);

export default app;