import { TokenDecrypter, TokenEncrypter } from "@/src/application/abstractions/cryptography";
import jwt, { JwtPayload } from 'jsonwebtoken'

export class TokenCrypter implements TokenEncrypter, TokenDecrypter {
    private readonly jwtExpireInSeconds = 86400;
    
    constructor(
        private readonly secret: string
    ) {}

    public encrypt(accountId: TokenEncrypter.Params): TokenEncrypter.Result {
        const nowInSeconds = Math.floor(Date.now() / 1000);
        const issuedAt = nowInSeconds;
        const expiresAt = nowInSeconds + this.jwtExpireInSeconds;

        const accessToken = jwt.sign({ accountId, issuedAt, expiresAt }, this.secret);
        return accessToken;
    }

    public decrypt(token: TokenDecrypter.Params): TokenDecrypter.Result {
        const payload = this.verifyToken(token);

        if (!payload || !payload.accountId || !payload.issuedAt || !payload.expiresAt) {
            return null;
        }

        return {
            accountId: payload.accountId,
            issuedAt: payload.issuedAt,
            expiresAt: payload.expiresAt
        }
    }

    private verifyToken(token: string): JwtPayload | null {
        try {
            const payload = jwt.verify(token, this.secret);
            if (typeof payload === 'string') {
                return null;               
            }

            return payload;
        } catch {
            return null;
        }
    }
}