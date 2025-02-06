import { AddAccountRepository, CheckAccountByEmailRepository } from "@/application/protocols/db/account";
import { TokenEncrypter, Hasher } from "@/application/protocols/cryptography";
import { EmailInUseError, ServerError } from "@/application/errors";


export class RegisterUsecase {
    constructor(
        private readonly hasher: Hasher,
        private readonly tokenEncrypter: TokenEncrypter,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
    ) {}

    async register(account: RegisterUsecase.Params): Promise<RegisterUsecase.Result> {
        const exists = await this.checkAccountByEmailRepository.checkByEmail(account.email);
        if (exists) {
            throw new EmailInUseError();
        }

        const hashedPassword = await this.hasher.hash(account.password);
        const createdAccount = await this.addAccountRepository.add({ ...account, password: hashedPassword });
        if (!createdAccount) {
            throw new ServerError();
        }

        const accessToken = this.tokenEncrypter.encrypt(createdAccount.id);

        return {
            accessToken,
            name: account.name
        }
    }
}

export namespace RegisterUsecase {
    export type Params = {
        name: string,
        email: string,
        password: string
    };
    export type Result = {
        accessToken: string,
        name: string
    };
}