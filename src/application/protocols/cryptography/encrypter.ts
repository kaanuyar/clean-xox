export interface Encrypter {
    encryptToken: (data: Encrypter.Params) => Encrypter.Result
}

export namespace Encrypter {
    export type Params = string;
    export type Result = string;
}