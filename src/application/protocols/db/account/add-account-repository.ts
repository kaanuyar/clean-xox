import { AccountModel } from "@/domain/models"

export interface AddAccountRepository {
    add: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
    export type Params = Omit<AccountModel, 'id'>;
    export type Result = AccountModel | null;
}