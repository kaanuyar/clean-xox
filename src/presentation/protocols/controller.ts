import { HttpResponse } from "@/presentation/protocols/http-response";

export interface Controller<T = any> {
    handle: (request: T) => Promise<HttpResponse>
}