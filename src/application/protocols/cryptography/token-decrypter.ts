import { TokenPayloadModel } from "@/domain/models";

export interface TokenDecrypter {
    decrypt: (token: TokenDecrypter.Params) => TokenDecrypter.Result
}

export namespace TokenDecrypter {
    export type Params = string;
    export type Result = TokenPayloadModel | null;
}