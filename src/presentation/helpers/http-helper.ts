import { ErrorResponse, HttpResponse } from '@/presentation/protocols'

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
});

export const badRequest = (error: ErrorResponse): HttpResponse => ({
    statusCode: 400,
    body: error
});

export const unauthorized = (error: ErrorResponse): HttpResponse => ({
    statusCode: 401,
    body: error
});

export const forbidden = (error: ErrorResponse): HttpResponse => ({
    statusCode: 403,
    body: error
});

export const serverError = (error: ErrorResponse): HttpResponse => ({
    statusCode: 500,
    body: error
});