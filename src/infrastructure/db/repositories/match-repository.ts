import { DbConnection } from "@/infrastructure/db/connection";
import { matchSchema } from "@/infrastructure/db/schema";
import { AddMatchRepository } from "@/application/protocols/db/match";
import { MatchResult, MatchState } from "@/domain/models";

export class MatchRepository implements AddMatchRepository {
    constructor(
        private readonly dbConnection: DbConnection
    ) {}

    async add(data: AddMatchRepository.Params): Promise<AddMatchRepository.Result> {
        const result = await this.dbConnection.db
            .insert(matchSchema)
            .values(data)
            .returning({
                code: matchSchema.code,
                state: matchSchema.state,
                result: matchSchema.result,
                startedAt: matchSchema.started_at,
                finishedAt: matchSchema.finished_at
            });

        const matches = result.map(match => ({
            ...match,
            state: match.state as MatchState,
            result: match.result as MatchResult
        }));

        const match = matches.length > 0 ? matches[0] : null;
        return match;
    }
}