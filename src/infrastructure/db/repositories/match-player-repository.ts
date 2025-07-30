import { AddMatchPlayerRepository } from "@/application/abstractions/db/match-player";
import { MatchPlayer } from "@/domain/entities";
import { DbConnection } from "@/infrastructure/db/connection";
import { Repository } from "@/infrastructure/db/abstractions";
import { matchPlayerSchema } from "@/infrastructure/db/schema/tables";

export class MatchPlayerRepository extends Repository implements AddMatchPlayerRepository {
    constructor(dbConnection: DbConnection) {
        super(dbConnection);
    }
    
    public async add(data: AddMatchPlayerRepository.Params): Promise<AddMatchPlayerRepository.Result> {
        const result = await this.db
            .insert(matchPlayerSchema)
            .values({
                matchId: data.matchId,
                accountId: data.accountId,
                playerSymbol: data.playerSymbol,
                joinedAt: data.joinedAt
            })
            .returning();

        const matchPlayer = result.length > 0 ? new MatchPlayer(result[0]) : null;
        return matchPlayer;
    }
}