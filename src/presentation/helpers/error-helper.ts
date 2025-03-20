import { ErrorResponse } from "@/presentation/contracts";

export const createErrorResponse = (error: Error): ErrorResponse => {
    return [{ message: error.message }];
}