import { makeOpenApiDocs } from '@/entrypoint/docs/openapi-docs'
import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

export default (app: Express): void => {
    app.use('/api-docs', serve, setup(makeOpenApiDocs()))
}