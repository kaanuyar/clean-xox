import { errorResponseSchema, createMatchResponseSchema } from "@/presentation/contracts";
import { jsonContent } from "@/entrypoint/docs/helpers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const makeCreateMatchPath =  (registry: OpenAPIRegistry): void => {
    registry.register('CreateMatchResponse', createMatchResponseSchema);
    const errorResponseContent = jsonContent(errorResponseSchema);

    registry.registerPath({
        method: 'post',
        path: '/match',
        tags: ['Match'],
        security: [{ bearerAuth: [] }],
        responses: {
            200: jsonContent(createMatchResponseSchema),
            400: errorResponseContent,
            401: errorResponseContent,
            500: errorResponseContent
        }
    });
}