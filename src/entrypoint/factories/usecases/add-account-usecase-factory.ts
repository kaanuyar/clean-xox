import { AddAccountUsecase } from "@/application/usecases";
import { makeAccountRepository } from "@/entrypoint/factories/db";
import { BcryptAdapter } from "@/infrastructure/cryptography";

export const makeAddAccountUsecase = (): AddAccountUsecase => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const accountRepository = makeAccountRepository();
    
    return new AddAccountUsecase(bcryptAdapter, accountRepository, accountRepository);
}