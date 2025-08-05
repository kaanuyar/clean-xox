import { ErrorResponse } from "@/src/presentation/contracts";

export const createErrorResponse = (error: Error): ErrorResponse => {
    return [{ message: error.message }];
}