import { MatchPlayerRepository } from "@/src/infrastructure/db/repositories";
import { getDbConnection } from "@/src/entrypoint/factories/db/db-connection-factory";

export const makeMatchPlayerRepository = (): MatchPlayerRepository => {
    return new MatchPlayerRepository(getDbConnection());
}