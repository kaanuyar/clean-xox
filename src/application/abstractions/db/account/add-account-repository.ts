import { Account } from "@/src/domain/entities";

export interface AddAccountRepository {
    add: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
    export type Params = Account;
    export type Result = Account | null;
}