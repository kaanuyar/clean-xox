export interface Decrypter {
    decryptToken: (token: Decrypter.Params) => Decrypter.Result
}

export namespace Decrypter {
    export type Params = string;
    export type Result = {
        sub: string,
        iat: number,
        exp: number
    } | null;
}