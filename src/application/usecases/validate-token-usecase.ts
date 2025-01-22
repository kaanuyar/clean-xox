import { TokenExpiredError, TokenInvalidError } from "@/application/errors";
import { Decrypter } from "@/application/protocols/cryptography";

export class ValidateTokenUsecase {
    constructor(
        private readonly decrypter: Decrypter
    ) {}

    validate(token: ValidateTokenUsecase.Params): ValidateTokenUsecase.Result {
        const payload = this.decrypter.decryptToken(token);
        if (!payload) {
            throw new TokenInvalidError();
        }

        const nowDateInMs = Math.floor(Date.now() / 1000);
        if (nowDateInMs > payload.exp) {
            throw new TokenExpiredError();
        }

        const accountId = Number(payload.sub);
        return { accountId };
    }
}

export namespace ValidateTokenUsecase {
    export type Params = string;
    export type Result = { accountId: number };
}