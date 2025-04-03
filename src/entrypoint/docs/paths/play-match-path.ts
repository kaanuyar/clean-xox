import { errorResponseSchema, playMatchRequestBodySchema, playMatchRequestParamsSchema } from "@/presentation/contracts";
import { emptyContent, jsonContent } from "@/entrypoint/docs/helpers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const makePlayMatchPath = (registry: OpenAPIRegistry): void => {
    registry.register('PlayMatchRequestParams', playMatchRequestParamsSchema);
    registry.register('PlayMatchRequestBody', playMatchRequestBodySchema);
    const errorResponseContent = jsonContent(errorResponseSchema);

    registry.registerPath({
        method: 'post',
        path: '/match/{code}/play',
        tags: ['Match'],
        security: [{ bearerAuth: [] }],
        request: {
            params: playMatchRequestParamsSchema,
            body: jsonContent(playMatchRequestBodySchema)
        },
        responses: {
            204: emptyContent(),
            400: errorResponseContent,
            401: errorResponseContent,
            403: errorResponseContent,
            404: errorResponseContent,
            409: errorResponseContent,
            500: errorResponseContent
        }
    });
}