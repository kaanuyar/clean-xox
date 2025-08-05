import { MatchPlayerRepository } from "@/src/infrastructure/db/repositories";
import { dbConnection } from "@/src/entrypoint/instances/db";

export const makeMatchPlayerRepository = (): MatchPlayerRepository => {
    return new MatchPlayerRepository(dbConnection);
}