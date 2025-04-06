import { AddMatchMoveRepository } from "@/application/protocols/db/match-move";
import { MatchMove } from "@/domain/entities";
import { DbConnection } from "@/infrastructure/db/connection";
import { Repository } from "@/infrastructure/db/protocols";
import { matchMoveSchema } from "@/infrastructure/db/schema/tables";

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