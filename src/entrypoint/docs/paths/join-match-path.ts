import { jsonContent } from "@/entrypoint/docs/helpers";
import { ErrorResponseSchema, JoinMatchRequestSchema, JoinMatchResponseSchema } from "@/presentation/contracts";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export default (registry: OpenAPIRegistry): void => {
    registry.register('JoinMatchRequest', JoinMatchRequestSchema);
    registry.register('JoinMatchResponse', JoinMatchResponseSchema);
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
            200: jsonContent(JoinMatchResponseSchema),
            400: errorResponseContent,
            401: errorResponseContent,
            500: errorResponseContent
        }
    });
}