import { AddMatchRepository, LoadMatchWithPlayersByCodeRepository, UpdateMatchByCodeRepository } from "@/application/protocols/db/match";
import { DbConnection } from "@/infrastructure/db/connection";
import { matchPlayerSchema, matchSchema } from "@/infrastructure/db/schema/tables";
import { Repository } from "@/infrastructure/db/protocols";
import { Match, MatchPlayer, MatchSession } from "@/domain/entities";
import { eq } from "drizzle-orm";

export class MatchRepository extends Repository implements AddMatchRepository, LoadMatchWithPlayersByCodeRepository, UpdateMatchByCodeRepository {
    constructor(dbConnection: DbConnection) {
        super(dbConnection);
    }

    async add(data: AddMatchRepository.Params): Promise<AddMatchRepository.Result> {
        const result = await this.db
            .insert(matchSchema)
            .values({
                id: data.id,
                code: data.code,
                state: data.state,
                result: data.result,
                startedAt: data.startedAt,
                finishedAt: data.finishedAt
            })
            .returning();

        const match = result.length > 0 ? new Match(result[0]) : null;
        return match;
    }

    async update(data: UpdateMatchByCodeRepository.Params): Promise<UpdateMatchByCodeRepository.Result> {
        const result = await this.db
            .update(matchSchema)
            .set({
                id: data.id,
                code: data.code,
                state: data.state,
                result: data.result,
                startedAt: data.startedAt,
                finishedAt: data.finishedAt,
                updatedAt: new Date()
            })
            .where(eq(matchSchema.code, data.code))
            .returning();

        const match = result.length > 0 ? new Match(result[0]) : null;
        return match;
    }

    async load(code: LoadMatchWithPlayersByCodeRepository.Params): Promise<LoadMatchWithPlayersByCodeRepository.Result> {
        const result = await this.db
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

        const entry = result[0];
        const match = new Match({
            id: entry.id,
            code: entry.code,
            state: entry.state,
            result: entry.result,
            startedAt: entry.startedAt,
            finishedAt: entry.finishedAt
        });

        const matchPlayers: MatchPlayer[] = [];
        result.forEach(({ id, accountId, playerSymbol, joinedAt }) => {
            if (accountId && playerSymbol && joinedAt) {
                const matchPlayer = new MatchPlayer({
                    matchId: id,
                    accountId,
                    playerSymbol,
                    joinedAt
                });
                matchPlayers.push(matchPlayer);
            }
        });
        
        return new MatchSession(match, matchPlayers);
    }
}