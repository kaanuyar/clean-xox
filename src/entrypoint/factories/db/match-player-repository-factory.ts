import { makeDbConnection } from "@/entrypoint/factories/db/db-connection-factory";
import { MatchPlayerRepository } from "@/infrastructure/db/repositories";

export const makeMatchPlayerRepository = (): MatchPlayerRepository => {
    return new MatchPlayerRepository(makeDbConnection());
}