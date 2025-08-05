import { HttpResponse } from "@/src/presentation/abstractions/http-response";

export interface Controller<T = any> {
    handle: (request: T) => Promise<HttpResponse>
}