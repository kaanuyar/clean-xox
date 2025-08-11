import { MatchMoveRepository } from "@/src/infrastructure/db/repositories";
import { getDbConnection } from "@/src/entrypoint/factories/db/db-connection-factory";

export const makeMatchMoveRepository = (): MatchMoveRepository => {
    return new MatchMoveRepository(getDbConnection());
}