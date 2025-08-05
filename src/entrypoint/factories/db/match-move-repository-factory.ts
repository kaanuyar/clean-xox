import { MatchMoveRepository } from "@/src/infrastructure/db/repositories";
import { dbConnection } from "@/src/entrypoint/instances/db";

export const makeMatchMoveRepository = (): MatchMoveRepository => {
    return new MatchMoveRepository(dbConnection);
}