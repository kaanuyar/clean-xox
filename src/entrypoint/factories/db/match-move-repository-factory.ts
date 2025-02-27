import { makeDbConnection } from "@/entrypoint/factories/db/db-connection-factory";
import { MatchMoveRepository } from "@/infrastructure/db/repositories";

export const makeMatchMoveRepository = (): MatchMoveRepository => {
    return new MatchMoveRepository(makeDbConnection());
}