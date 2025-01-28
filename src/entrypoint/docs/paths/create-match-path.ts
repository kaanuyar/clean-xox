import { jsonContent } from "@/entrypoint/docs/helpers";
import { ErrorResponseSchema, CreateMatchResponseSchema } from "@/presentation/contracts";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export default (registry: OpenAPIRegistry): void => {
    registry.register('CreateMatchResponse', CreateMatchResponseSchema);
    const errorResponseContent = jsonContent(ErrorResponseSchema);

    registry.registerPath({
        method: 'post',
        path: '/match',
        tags: ['Match'],
        security: [{ bearerAuth: [] }],
        responses: {
            200: jsonContent(CreateMatchResponseSchema),
            400: errorResponseContent,
            401: errorResponseContent,
            500: errorResponseContent
        }
    });
}