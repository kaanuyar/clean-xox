import { Middleware } from "@/presentation/protocols/middleware";
import { NextFunction, Request, Response } from "express";

export const adaptMiddleware = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const request = {
            ...(req.body || {}),
            ...(req.params || {})
        };

        const httpResponse = await middleware.handle(request);
        
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            next();
        } else {
            res.status(httpResponse.statusCode).json({ errors: httpResponse.body });
        }
    }
}