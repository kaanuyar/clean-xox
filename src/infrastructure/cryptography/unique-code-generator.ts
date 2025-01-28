import { customAlphabet } from "nanoid";
import { CodeGenerator } from "@/application/protocols/cryptography";

export class UniqueCodeGenerator implements CodeGenerator {
    private readonly alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    generateCode(): string {
        const generator = customAlphabet(this.alphabet, 8);
        const code = generator();

        return code;
    }
}