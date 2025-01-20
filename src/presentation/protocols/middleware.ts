import { HttpResponse } from "@/presentation/protocols/http-response";

export interface Middleware<T = any> {
    handle: (data: T) => Promise<HttpResponse>
}