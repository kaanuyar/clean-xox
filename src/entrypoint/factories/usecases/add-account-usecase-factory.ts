import { AddAccountUsecase } from "@/application/usecases";
import { BcryptAdapter } from "@/infrastructure/cryptography";
import { AccountMongoRepository } from "@/infrastructure/db/mongodb";

export const makeAddAccountUsecase = (): AddAccountUsecase => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const accountMongoRepository = new AccountMongoRepository();
    
    return new AddAccountUsecase(bcryptAdapter, accountMongoRepository, accountMongoRepository);
}