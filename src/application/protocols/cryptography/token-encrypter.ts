export interface TokenEncrypter {
    encrypt: (accountId: TokenEncrypter.Params) => TokenEncrypter.Result
}

export namespace TokenEncrypter {
    export type Params = number;
    export type Result = string;
}