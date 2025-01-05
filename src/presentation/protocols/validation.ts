import { ErrorResponse } from "@/presentation/protocols"

export interface Validation {
    validate: (input: any) => ValidationResult
}

export type ValidationResult = {
    isSuccess: boolean,
    errorResponse: ErrorResponse
}