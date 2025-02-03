import { MatchResult, MatchState } from "@/domain/models";

export type MatchModel = {
    id: number,
    code: string,
    state: MatchState,
    result?: MatchResult | null,
    startedAt?: Date | null,
    finishedAt?: Date | null
};