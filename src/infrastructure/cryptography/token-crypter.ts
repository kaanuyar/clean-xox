import { TokenDecrypter, TokenEncrypter } from "@/application/protocols/cryptography";
import jwt, { JwtPayload } from 'jsonwebtoken'

export class TokenCrypter implements TokenEncrypter, TokenDecrypter {
    private readonly jwtExpireInMs = 3600;
    
    constructor(
        private readonly secret: string
    ) {}

    encrypt(accountId: TokenEncrypter.Params): TokenEncrypter.Result {
        const nowDateInMs = Math.floor(Date.now() / 1000);
        const issuedAt = nowDateInMs;
        const expiresAt = nowDateInMs + this.jwtExpireInMs;

        const accessToken = jwt.sign({ accountId, issuedAt, expiresAt }, this.secret);
        return accessToken;
    }

    decrypt(token: TokenDecrypter.Params): TokenDecrypter.Result {
        let payload: JwtPayload;

        try {
            payload = jwt.verify(token, this.secret) as JwtPayload;   
        } catch {
            return null;
        }

        if (!payload.accountId || !payload.issuedAt || !payload.expiresAt) {
            return null;
        }

        return {
            accountId: payload.accountId,
            issuedAt: payload.issuedAt,
            expiresAt: payload.expiresAt
        }
    }
}