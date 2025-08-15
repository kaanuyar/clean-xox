import { MatchMoveRepository } from "@/src/infrastructure/db/repositories";
import { getDbConnection } from "@/src/entrypoint/instances/db";

export const makeMatchMoveRepository = (): MatchMoveRepository => {
    return new MatchMoveRepository(getDbConnection());
}