import { TokenExpiredError, TokenInvalidError } from "@/application/errors";
import { TokenDecrypter } from "@/application/protocols/cryptography";

export class ValidateTokenUsecase {
    constructor(
        private readonly tokenDecrypter: TokenDecrypter
    ) {}

    validate(token: ValidateTokenUsecase.Params): ValidateTokenUsecase.Result {
        const payload = this.tokenDecrypter.decrypt(token);
        if (!payload) {
            throw new TokenInvalidError();
        }

        const nowInSeconds = Math.floor(Date.now() / 1000);
        if (nowInSeconds > payload.expiresAt) {
            throw new TokenExpiredError();
        }

        return { accountId: payload.accountId };
    }
}

export namespace ValidateTokenUsecase {
    export type Params = string;
    export type Result = { accountId: string };
}