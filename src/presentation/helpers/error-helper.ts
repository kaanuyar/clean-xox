import { ErrorResponse } from "@/presentation/protocols";

export const createErrorResponse = (error: Error): ErrorResponse => {
    return [{ message: error.message }];
}