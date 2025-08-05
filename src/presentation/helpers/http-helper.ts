import { ErrorResponse } from '@/src/presentation/contracts';
import { HttpResponse } from '@/src/presentation/abstractions'

export const ok = <T>(data: T): HttpResponse<T> => ({
    statusCode: 200,
    body: data
});

export const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: null
});

export const badRequest = (error: ErrorResponse): HttpResponse<ErrorResponse> => ({
    statusCode: 400,
    body: error
});

export const unauthorized = (error: ErrorResponse): HttpResponse<ErrorResponse> => ({
    statusCode: 401,
    body: error
});

export const forbidden = (error: ErrorResponse): HttpResponse<ErrorResponse> => ({
    statusCode: 403,
    body: error
});

export const notFound = (error: ErrorResponse): HttpResponse<ErrorResponse> => ({
    statusCode: 404,
    body: error
});

export const conflict = (error: ErrorResponse): HttpResponse<ErrorResponse> => ({
    statusCode: 409,
    body: error
});

export const serverError = (error: ErrorResponse): HttpResponse<ErrorResponse> => ({
    statusCode: 500,
    body: error
});