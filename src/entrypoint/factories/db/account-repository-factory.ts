import { AccountRepository } from "@/infrastructure/db/repositories";
import { dbConnection } from "@/entrypoint/instances/db";

export const makeAccountRepository = (): AccountRepository => {
    return new AccountRepository(dbConnection);
}