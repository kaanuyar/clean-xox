import { TokenExpiredError, TokenInvalidError } from "@/src/application/errors";
import { TokenDecrypter } from "@/src/application/abstractions/cryptography";
import { ContextModel } from "@/src/application/models";

export class ValidateTokenUsecase {
    constructor(
        private readonly tokenDecrypter: TokenDecrypter
    ) {}

    public validate(token: ValidateTokenUsecase.Params): ValidateTokenUsecase.Result {
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
    export type Result = ContextModel;
}