import { MatchMoveRepository } from "@/infrastructure/db/repositories";
import { dbConnection } from "@/entrypoint/instances/db";

export const makeMatchMoveRepository = (): MatchMoveRepository => {
    return new MatchMoveRepository(dbConnection);
}