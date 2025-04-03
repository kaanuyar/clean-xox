import { makeOpenApiDocs } from '@/entrypoint/docs/generator'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', serve, setup(makeOpenApiDocs()))
}