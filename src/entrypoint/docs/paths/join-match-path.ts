import { emptyContent, jsonContent } from "@/entrypoint/docs/helpers";
import { ErrorResponseSchema, JoinMatchRequestSchema } from "@/presentation/contracts";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export default (registry: OpenAPIRegistry): void => {
    registry.register('JoinMatchRequest', JoinMatchRequestSchema);
    const errorResponseContent = jsonContent(ErrorResponseSchema);

    registry.registerPath({
        method: 'post',
        path: '/match/{code}/join',
        tags: ['Match'],
        security: [{ bearerAuth: [] }],
        request: {
            params: JoinMatchRequestSchema
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