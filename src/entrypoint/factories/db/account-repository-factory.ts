import { makeDbConnection } from "@/entrypoint/factories/db/db-connection-factory";
import { AccountRepository } from "@/infrastructure/db/repositories";

export const makeAccountRepository = (): AccountRepository => {
    return new AccountRepository(makeDbConnection());
}