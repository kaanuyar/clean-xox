import { HashComparer, Hasher } from "@/application/protocols/cryptography";
import bcrypt from 'bcrypt'

export class PasswordHasher implements Hasher, HashComparer {
    constructor(
        private readonly salt: number
    ) {}

    public async hash(plaintext: string): Promise<string> {
        const digest = await bcrypt.hash(plaintext, this.salt);
        return digest;
    }

    public async compare(plaintext: string, digest: string): Promise<boolean> {
        const isValid = await bcrypt.compare(plaintext, digest);
        return isValid;
    }
}