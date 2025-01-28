import { makeDbConnection } from "@/entrypoint/factories/db/db-connection-factory";
import { MatchRepository } from "@/infrastructure/db/repositories";

export const makeMatchRepository = (): MatchRepository => {
    return new MatchRepository(makeDbConnection());
}