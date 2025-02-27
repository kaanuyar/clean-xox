import { emptyContent, jsonContent } from "@/entrypoint/docs/helpers";
import { ErrorResponseSchema, PlayMatchRequestBodySchema, PlayMatchRequestParamsSchema } from "@/presentation/contracts";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export default (registry: OpenAPIRegistry): void => {
    registry.register('PlayMatchRequestParams', PlayMatchRequestParamsSchema);
    registry.register('PlayMatchRequestBody', PlayMatchRequestBodySchema);
    const errorResponseContent = jsonContent(ErrorResponseSchema);

    registry.registerPath({
        method: 'post',
        path: '/match/{code}/play',
        tags: ['Match'],
        security: [{ bearerAuth: [] }],
        request: {
            params: PlayMatchRequestParamsSchema,
            body: jsonContent(PlayMatchRequestBodySchema)
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