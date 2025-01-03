import { AccountModel } from "@/domain/models";
import { AddAccountRepository, CheckAccountByEmailRepository } from "@/application/protocols/db/account";
import { Hasher } from "@/application/protocols/cryptography";
import { EmailInUseError } from "@/application/errors";

export class AddAccountUsecase {
    constructor(
        private readonly hasher: Hasher,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
    ) {}

    async add(account: AddAccountUsecase.Params): Promise<AddAccountUsecase.Result> {
        const exists = await this.checkAccountByEmailRepository.checkByEmail(account.email);
        if (exists) {
            throw new EmailInUseError();
        }

        const hashedPassword = await this.hasher.hash(account.password);
        return await this.addAccountRepository.add({...account, password: hashedPassword});
    }
}

export namespace AddAccountUsecase {
    export type Params = AccountModel;
    export type Result = boolean;
}