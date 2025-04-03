import { MatchRepository } from "@/infrastructure/db/repositories";
import { dbConnection } from "@/entrypoint/instances/db";

export const makeMatchRepository = (): MatchRepository => {
    return new MatchRepository(dbConnection);
}