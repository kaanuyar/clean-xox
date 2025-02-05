import { AddMatchPlayerRepository } from "@/application/protocols/db/match-player";
import { DbConnection } from "@/infrastructure/db/connection";
import { matchPlayerSchema } from "@/infrastructure/db/schema/tables";

export class MatchPlayerRepository implements AddMatchPlayerRepository {
    constructor(
        private readonly dbConnection: DbConnection
    ) {}
    
    async add(data: AddMatchPlayerRepository.Params): Promise<AddMatchPlayerRepository.Result> {
        const result = await this.dbConnection.db
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