import { AccountModel } from "@/domain/models"

export interface AddAccountRepository {
    add: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
    export type Params = AccountModel;
    export type Result = boolean;
}