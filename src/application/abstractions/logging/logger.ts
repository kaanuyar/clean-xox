export interface Logger {
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (reason: string | Error) => void;
}