import { HttpResponse } from "@/src/presentation/abstractions/http-response";

export interface Middleware<T = any> {
    handle: (data: T) => Promise<HttpResponse>
}