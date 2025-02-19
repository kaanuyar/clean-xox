export interface TokenEncrypter {
    encrypt: (accountId: TokenEncrypter.Params) => TokenEncrypter.Result
}

export namespace TokenEncrypter {
    export type Params = string;
    export type Result = string;
}