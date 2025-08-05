import { extendZodWithOpenApi, OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { pathRegistryFunctions } from '@/src/entrypoint/docs/paths';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const makeOpenApiDocs = () => {
    const registry = new OpenAPIRegistry();

    registry.registerComponent('securitySchemes', 'bearerAuth', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    });
    
    for (const pathRegistryFunc of pathRegistryFunctions) {
        pathRegistryFunc(registry);
    }

    const generator = new OpenApiGeneratorV3(registry.definitions);
    const doc = generator.generateDocument({
        openapi: '3.0.0',
        info: {
            title: 'clean-xox',
            version: '1.0.0'
        },
        tags: [
            { name: 'Authentication' },
            { name: 'Match' }
        ],
        servers: [{ url: '/api' }]
    });

    return doc;
}