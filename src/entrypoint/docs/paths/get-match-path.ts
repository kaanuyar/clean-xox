import { errorResponseSchema, getMatchRequestSchema, getMatchResponseSchema } from "@/src/presentation/contracts";
import { jsonContent } from "@/src/entrypoint/docs/helpers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const makeGetMatchPath = (registry: OpenAPIRegistry): void => {
    registry.register('GetMatchRequest', getMatchRequestSchema);
    registry.register('GetMatchResponse', getMatchResponseSchema);
    const errorResponseContent = jsonContent(errorResponseSchema);

    registry.registerPath({
        method: 'get',
        path: '/match/{code}',
        tags: ['Match'],
        security: [{ bearerAuth: [] }],
        request: {
            params: getMatchRequestSchema
        },
        responses: {
            200: jsonContent(getMatchResponseSchema),
            400: errorResponseContent,
            401: errorResponseContent,
            404: errorResponseContent,
            500: errorResponseContent
        }
    });
}