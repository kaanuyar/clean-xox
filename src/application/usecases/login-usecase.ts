import { EmailUnregisteredError, PasswordInvalidError } from '@/application/errors';
import { Encrypter, HashComparer } from '@/application/protocols/cryptography';
import { LoadAccountByEmailRepository } from '@/application/protocols/db/account';

export class LoginUsecase {
    constructor(
        private readonly encrypter: Encrypter,
        private readonly hashComparer: HashComparer,
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    ) {}

    async login(params: LoginUsecase.Params): Promise<LoginUsecase.Result> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(params.email);
        if (!account) {
            throw new EmailUnregisteredError();
        }

        const isValid = await this.hashComparer.compare(params.password, account.password);
        if (!isValid) {
            throw new PasswordInvalidError();
        }
        
        const accessToken = this.encrypter.encrypt(account.id.toString());

        return {
            accessToken,
            name: account.name
        }
    }
}

export namespace LoginUsecase {
    export type Params = {
        email: string,
        password: string
    };

    export type Result = {
        accessToken: string,
        name: string
    };
}