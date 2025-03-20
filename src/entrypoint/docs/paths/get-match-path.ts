import { jsonContent } from "@/entrypoint/docs/helpers";
import { ErrorResponseSchema, GetMatchRequestSchema, GetMatchResponseSchema } from "@/presentation/contracts";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export default (registry: OpenAPIRegistry): void => {
    registry.register('GetMatchRequest', GetMatchRequestSchema);
    registry.register('GetMatchResponse', GetMatchResponseSchema);
    const errorResponseContent = jsonContent(ErrorResponseSchema);

    registry.registerPath({
        method: 'get',
        path: '/match/{code}',
        tags: ['Match'],
        security: [{ bearerAuth: [] }],
        request: {
            params: GetMatchRequestSchema
        },
        responses: {
            200: jsonContent(GetMatchResponseSchema),
            400: errorResponseContent,
            401: errorResponseContent,
            404: errorResponseContent,
            500: errorResponseContent
        }
    });
}