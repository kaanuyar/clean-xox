import { Decrypter, Encrypter } from "@/application/protocols/cryptography";
import jwt, { JwtPayload } from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
    private readonly JwtExpireInMs = 3600;
    
    constructor(
        private readonly secret: string
    ) {}

    encryptToken(data: Encrypter.Params): Encrypter.Result {
        const nowDateInMs = Math.floor(Date.now() / 1000);
        const timeFields = {
            iat: nowDateInMs,
            exp: nowDateInMs + this.JwtExpireInMs
        };
        return jwt.sign({ sub: data, ...timeFields }, this.secret);
    }

    decryptToken(token: Decrypter.Params): Decrypter.Result {
        try {
            const payload = jwt.verify(token, this.secret) as JwtPayload;
            if (!payload.sub || !payload.iat || !payload.exp) {
                return null;
            }

            return {
                sub: payload.sub,
                iat: payload.iat,
                exp: payload.exp
            }
        } catch {
            return null;
        }
    }
}