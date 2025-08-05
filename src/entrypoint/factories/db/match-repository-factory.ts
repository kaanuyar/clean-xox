import { MatchRepository } from "@/src/infrastructure/db/repositories";
import { dbConnection } from "@/src/entrypoint/instances/db";

export const makeMatchRepository = (): MatchRepository => {
    return new MatchRepository(dbConnection);
}