import { AccountRepository } from "@/src/infrastructure/db/repositories";
import { getDbConnection } from "@/src/entrypoint/instances/db";

export const makeAccountRepository = (): AccountRepository => {
    return new AccountRepository(getDbConnection());
}