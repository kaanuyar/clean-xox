import { MatchRepository } from "@/src/infrastructure/db/repositories";
import { getDbConnection } from "@/src/entrypoint/instances/db";

export const makeMatchRepository = (): MatchRepository => {
    return new MatchRepository(getDbConnection());
}