import { Middleware } from "@/presentation/abstractions";
import { NextFunction, Request, Response } from "express";

export const adaptMiddleware = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const request = {
            ...(req.body || {}),
            ...(req.params || {}),
            accessToken: req.get('Authorization')?.substring(7) || ''
        };

        const httpResponse = await middleware.handle(request);
        
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.locals = {
                ...(res.locals || {}),
                ...(httpResponse.body || {})
            };
            next();
        } else {
            res.status(httpResponse.statusCode).json({ errors: httpResponse.body });
        }
    }
}