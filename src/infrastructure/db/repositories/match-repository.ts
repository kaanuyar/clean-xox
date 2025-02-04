import { AddMatchPlayerRepository, AddMatchRepository, LoadMatchPlayersByCodeRepository, UpdateMatchByCodeRepository } from "@/application/protocols/db/match";
import { DbConnection } from "@/infrastructure/db/connection";
import { matchPlayerSchema, matchSchema } from "@/infrastructure/db/schema/tables";
import { MatchPlayerModel } from "@/domain/models";
import { eq } from "drizzle-orm";

export class MatchRepository implements AddMatchRepository, LoadMatchPlayersByCodeRepository, AddMatchPlayerRepository, UpdateMatchByCodeRepository {
    constructor(
        private readonly dbConnection: DbConnection
    ) {}

    async addMatch(data: AddMatchRepository.Params): Promise<AddMatchRepository.Result> {
        const result = await this.dbConnection.db
            .insert(matchSchema)
            .values(data)
            .returning({
                id: matchSchema.id,
                code: matchSchema.code,
                state: matchSchema.state,
                result: matchSchema.result,
                startedAt: matchSchema.startedAt,
                finishedAt: matchSchema.finishedAt
            });

        const match = result.length > 0 ? result[0] : null;
        return match;
    }

    async updateMatch(data: UpdateMatchByCodeRepository.Params): Promise<UpdateMatchByCodeRepository.Result> {
        const result = await this.dbConnection.db
            .update(matchSchema)
            .set({
                ...data,
                updatedAt: new Date()
            })
            .where(eq(matchSchema.code, data.code))
            .returning({
                id: matchSchema.id,
                code: matchSchema.code,
                state: matchSchema.state,
                result: matchSchema.result,
                startedAt: matchSchema.startedAt,
                finishedAt: matchSchema.finishedAt
            });

        const match = result.length > 0 ? result[0] : null;
        return match;
    }

    async addMatchPlayer(data: AddMatchPlayerRepository.Params): Promise<AddMatchPlayerRepository.Result> {
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

    async load(code: LoadMatchPlayersByCodeRepository.Params): Promise<LoadMatchPlayersByCodeRepository.Result> {
        const result = await this.dbConnection.db
            .select({
                id: matchSchema.id,
                code: matchSchema.code,
                state: matchSchema.state,
                result: matchSchema.result,
                startedAt: matchSchema.startedAt,
                finishedAt: matchSchema.finishedAt,
                accountId: matchPlayerSchema.accountId,
                playerSymbol: matchPlayerSchema.playerSymbol,
                joinedAt: matchPlayerSchema.joinedAt
            })
            .from(matchSchema)
            .leftJoin(matchPlayerSchema, eq(matchSchema.id, matchPlayerSchema.matchId))
            .where(eq(matchSchema.code, code));
        
        if (result.length === 0) {
            return null;
        }

        const row = result[0];
        const match = {
            id: row.id,
            code: row.code,
            state: row.state,
            result: row.result,
            startedAt: row.startedAt,
            finishedAt: row.finishedAt
        };

        let players: MatchPlayerModel[] = [];
        result.forEach(({ id, accountId, playerSymbol, joinedAt }) => {
            if (accountId && playerSymbol && joinedAt) {
                players.push({
                    matchId: id,
                    accountId,
                    playerSymbol,
                    joinedAt
                });    
            }
        });
        
        return { match, players };
    }
}