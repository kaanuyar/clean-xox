import { MatchPlayerRepository } from "@/infrastructure/db/repositories";
import { dbConnection } from "@/entrypoint/instances/db";

export const makeMatchPlayerRepository = (): MatchPlayerRepository => {
    return new MatchPlayerRepository(dbConnection);
}