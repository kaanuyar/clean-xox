import { MatchPlayerRepository } from "@/src/infrastructure/db/repositories";
import { getDbConnection } from "@/src/entrypoint/instances/db";

export const makeMatchPlayerRepository = (): MatchPlayerRepository => {
    return new MatchPlayerRepository(getDbConnection());
}