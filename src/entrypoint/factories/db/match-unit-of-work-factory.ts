import { makeMatchMoveRepository } from "@/src/entrypoint/factories/db/match-move-repository-factory";
import { makeMatchPlayerRepository } from "@/src/entrypoint/factories/db/match-player-repository-factory";
import { makeMatchRepository } from "@/src/entrypoint/factories/db/match-repository-factory";
import { MatchUnitOfWork } from "@/src/infrastructure/db/unit-of-work";
import { dbConnection } from "@/src/entrypoint/instances/db";

export const makeMatchUnitOfWork = (): MatchUnitOfWork => {
    const matchRepository = makeMatchRepository();
    const matchPlayerRepository = makeMatchPlayerRepository();
    const matchMoveRepository = makeMatchMoveRepository();
    
    return new MatchUnitOfWork(dbConnection, matchRepository, matchPlayerRepository, matchMoveRepository);
};