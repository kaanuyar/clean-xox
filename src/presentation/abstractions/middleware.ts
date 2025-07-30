import { HttpResponse } from "@/presentation/abstractions/http-response";

export interface Middleware<T = any> {
    handle: (data: T) => Promise<HttpResponse>
}