import { AddMatchRepository, LoadMatchSessionByCodeRepository, UpdateMatchByCodeRepository } from "@/application/protocols/db/match";
import { DbConnection } from "@/infrastructure/db/connection";
import { matchMoveSchema, matchPlayerSchema, matchSchema } from "@/infrastructure/db/schema/tables";
import { Repository } from "@/infrastructure/db/protocols";
import { Match, MatchMove, MatchPlayer, MatchSession } from "@/domain/entities";
import { MatchPlayerModel, MatchMoveModel } from "@/domain/models";
import { and, eq } from "drizzle-orm";

export class MatchRepository extends Repository implements AddMatchRepository, LoadMatchSessionByCodeRepository, UpdateMatchByCodeRepository {
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

    async load(code: LoadMatchSessionByCodeRepository.Params): Promise<LoadMatchSessionByCodeRepository.Result> {
        const result = await this.db
            .select({
                matchId: matchSchema.id,
                code: matchSchema.code,
                state: matchSchema.state,
                result: matchSchema.result,
                startedAt: matchSchema.startedAt,
                finishedAt: matchSchema.finishedAt,
                accountId: matchPlayerSchema.accountId,
                playerSymbol: matchPlayerSchema.playerSymbol,
                joinedAt: matchPlayerSchema.joinedAt,
                turn: matchMoveSchema.turn,
                symbolPosition: matchMoveSchema.symbolPosition,
                movedAt: matchMoveSchema.movedAt
            })
            .from(matchSchema)
            .leftJoin(matchPlayerSchema, eq(matchSchema.id, matchPlayerSchema.matchId))
            .leftJoin(matchMoveSchema, and(
                eq(matchPlayerSchema.matchId, matchMoveSchema.matchId), 
                eq(matchPlayerSchema.accountId, matchMoveSchema.accountId))
            )
            .where(eq(matchSchema.code, code));
        
        if (result.length === 0) {
            return null;
        }

        const firstEntry = result[0];
        const match = new Match({
            id: firstEntry.matchId,
            code: firstEntry.code,
            state: firstEntry.state,
            result: firstEntry.result,
            startedAt: firstEntry.startedAt,
            finishedAt: firstEntry.finishedAt
        });

        const matchPlayerModels: MatchPlayerModel[] = [];
        const matchMoveModels: MatchMoveModel[] = [];

        for (const entry of result) {
            const { matchId, accountId, playerSymbol, joinedAt, turn, symbolPosition, movedAt } = entry;
            if (matchId && accountId && playerSymbol && joinedAt) {
                matchPlayerModels.push({ matchId, accountId, playerSymbol, joinedAt });
            }

            if (accountId && movedAt && turn !== null && symbolPosition !== null) {
                matchMoveModels.push({ matchId, accountId, turn, symbolPosition, movedAt });
            }
        }

        const matchPlayers: MatchPlayer[] = this.getDistinctMatchPlayers(matchPlayerModels);
        const matchMoves: MatchMove[] = this.getDistinctMatchMoves(matchMoveModels);
        
        return new MatchSession(match, matchPlayers, matchMoves);
    }

    getDistinctMatchPlayers(matchPlayers: MatchPlayerModel[]): MatchPlayer[] {
        const map: Map<string, MatchPlayer> = new Map();

        for (const matchPlayer of matchPlayers) {
            const mapKey = matchPlayer.matchId.concat('-', matchPlayer.accountId);
            if (!map.has(mapKey)) {
                map.set(mapKey, new MatchPlayer(matchPlayer));
            }
        }

        return Array.from(map.values());
    }

    getDistinctMatchMoves(matchMoves: MatchMoveModel[]): MatchMove[] {
        const map: Map<string, MatchMove> = new Map();

        for (const matchMove of matchMoves) {
            const mapKey = matchMove.matchId.concat('-', matchMove.turn.toString());
            if (!map.has(mapKey)) {
                map.set(mapKey, new MatchMove(matchMove));
            }
        }

        return Array.from(map.values());
    }
}