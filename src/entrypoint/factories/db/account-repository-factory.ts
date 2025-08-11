import { AccountRepository } from "@/src/infrastructure/db/repositories";
import { getDbConnection } from "@/src/entrypoint/factories/db/db-connection-factory";

export const makeAccountRepository = (): AccountRepository => {
    return new AccountRepository(getDbConnection());
}