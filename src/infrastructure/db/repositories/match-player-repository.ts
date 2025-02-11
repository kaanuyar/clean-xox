import { AddMatchPlayerRepository } from "@/application/protocols/db/match-player";
import { DbConnection } from "@/infrastructure/db/connection";
import { Repository } from "@/infrastructure/db/protocols";
import { matchPlayerSchema } from "@/infrastructure/db/schema/tables";

export class MatchPlayerRepository extends Repository implements AddMatchPlayerRepository {
    constructor(dbConnection: DbConnection) {
        super(dbConnection);
    }
    
    async add(data: AddMatchPlayerRepository.Params): Promise<AddMatchPlayerRepository.Result> {
        const result = await this.db
            .insert(matchPlayerSchema)
            .values(data)
            .returning({
                matchId: matchPlayerSchema.matchId,
                accountId: matchPlayerSchema.accountId,
                playerSymbol: matchPlayerSchema.playerSymbol,
                joinedAt: matchPlayerSchema.joinedAt
            });

        const match = result.length > 0 ? result[0] : null;
        return match;
    }
}