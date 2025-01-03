import { Decrypter, Encrypter } from "@/application/protocols/cryptography";
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(
        private readonly secret: string
    ) {}

    encrypt(plaintext: string): string {
        const ciphertext = jwt.sign({ id: plaintext}, this.secret);
        return ciphertext;
    }

    decrypt(ciphertext: string): string {
        const plaintext = jwt.verify(ciphertext, this.secret);
        return plaintext as string;
    }
}