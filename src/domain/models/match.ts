import { MatchResult } from "@/domain/models/match-result";
import { MatchState } from "@/domain/models/match-state";

export type MatchModel = {
    id: number,
    code: string,
    state: MatchState,
    result?: MatchResult | null,
    startedAt?: Date | null,
    finishedAt?: Date | null
};