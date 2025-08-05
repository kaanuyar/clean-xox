import { AddMatchMoveRepository } from "@/src/application/abstractions/db/match-move";
import { MatchMove } from "@/src/domain/entities";
import { DbConnection } from "@/src/infrastructure/db/connection";
import { Repository } from "@/src/infrastructure/db/abstractions";
import { matchMoveSchema } from "@/src/infrastructure/db/schema/tables";

export class MatchMoveRepository extends Repository implements AddMatchMoveRepository {
    constructor(dbConnection: DbConnection) {
        super(dbConnection);
    }
    
    public async add(data: AddMatchMoveRepository.Params): Promise<AddMatchMoveRepository.Result> {
        const result = await this.db
            .insert(matchMoveSchema)
            .values({
                matchId: data.matchId,
                accountId: data.accountId,
                turn: data.turn,
                symbolPosition: data.symbolPosition,
                movedAt: data.movedAt
            })
            .returning();

        const matchMove = result.length > 0 ? new MatchMove(result[0]) : null;
        return matchMove;
    }
}