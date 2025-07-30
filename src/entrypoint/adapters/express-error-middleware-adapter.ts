import { Middleware } from "@/presentation/abstractions";
import { NextFunction, Request, Response } from "express";

export const adaptErrorMiddleware = (middleware: Middleware) => {
    return async (err: Error, _req: Request, res: Response, next: NextFunction) => {
        const httpResponse = await middleware.handle(err);
        
        if (httpResponse.statusCode >= 400 && httpResponse.statusCode <= 599) {
            res.status(httpResponse.statusCode).json({ errors: httpResponse.body });
        } else {
            next(err);
        }
    }
}