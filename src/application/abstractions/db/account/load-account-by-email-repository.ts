import { Account } from "@/src/domain/entities";

export interface LoadAccountByEmailRepository {
    loadByEmail: (email: LoadAccountByEmailRepository.Params) => Promise<LoadAccountByEmailRepository.Result>
}

export namespace LoadAccountByEmailRepository {
    export type Params = string;
    export type Result = Account | null;
}