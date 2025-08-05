import { AddAccountRepository, CheckAccountByEmailRepository } from "@/src/application/abstractions/db/account";
import { TokenEncrypter, Hasher } from "@/src/application/abstractions/cryptography";
import { EmailInUseError, ServerError } from "@/src/application/errors";
import { Account } from "@/src/domain/entities";


export class RegisterUsecase {
    constructor(
        private readonly hasher: Hasher,
        private readonly tokenEncrypter: TokenEncrypter,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
    ) {}

    public async register(params: RegisterUsecase.Params): Promise<RegisterUsecase.Result> {
        const exists = await this.checkAccountByEmailRepository.checkByEmail(params.email);
        if (exists) {
            throw new EmailInUseError();
        }

        const hashedPassword = await this.hasher.hash(params.password);
        const account = Account.createNew({ ...params, password: hashedPassword });

        const createdAccount = await this.addAccountRepository.add(account);
        if (!createdAccount) {
            throw new ServerError();
        }

        const accessToken = this.tokenEncrypter.encrypt(createdAccount.id);

        return { accessToken };
    }
}

export namespace RegisterUsecase {
    export type Params = {
        name: string,
        email: string,
        password: string
    };
    export type Result = {
        accessToken: string
    };
}