import { errorResponseSchema, joinMatchRequestSchema } from "@/src/presentation/contracts";
import { emptyContent, jsonContent } from "@/src/entrypoint/docs/helpers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const makeJoinMatchPath = (registry: OpenAPIRegistry): void => {
    registry.register('JoinMatchRequest', joinMatchRequestSchema);
    const errorResponseContent = jsonContent(errorResponseSchema);

    registry.registerPath({
        method: 'post',
        path: '/match/{code}/join',
        tags: ['Match'],
        security: [{ bearerAuth: [] }],
        request: {
            params: joinMatchRequestSchema
        },
        responses: {
            204: emptyContent(),
            400: errorResponseContent,
            401: errorResponseContent,
            404: errorResponseContent,
            409: errorResponseContent,
            500: errorResponseContent
        }
    });
}