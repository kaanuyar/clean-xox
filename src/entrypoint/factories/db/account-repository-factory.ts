import { AccountRepository } from "@/src/infrastructure/db/repositories";
import { dbConnection } from "@/src/entrypoint/instances/db";

export const makeAccountRepository = (): AccountRepository => {
    return new AccountRepository(dbConnection);
}