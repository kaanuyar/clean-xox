import { makeDbConnection } from "@/entrypoint/factories/db/db-connection-factory";
import { makeMatchPlayerRepository } from "@/entrypoint/factories/db/match-player-repository-factory";
import { makeMatchRepository } from "@/entrypoint/factories/db/match-repository-factory";
import { MatchUnitOfWork } from "@/infrastructure/db/unit-of-work";

export const makeMatchUnitOfWork = (): MatchUnitOfWork => {
    const dbConnection = makeDbConnection();
    const matchRepository = makeMatchRepository();
    const matchPlayerRepository = makeMatchPlayerRepository();
    
    return new MatchUnitOfWork(dbConnection, matchRepository, matchPlayerRepository);
};