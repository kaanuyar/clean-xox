import { MatchRepository } from "@/src/infrastructure/db/repositories";
import { getDbConnection } from "@/src/entrypoint/factories/db/db-connection-factory";

export const makeMatchRepository = (): MatchRepository => {
    return new MatchRepository(getDbConnection());
}