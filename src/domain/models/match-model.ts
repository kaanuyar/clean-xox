import { MatchResult, MatchState } from "@/domain/constants";

export type MatchModel = {
    id: string,
    code: string,
    state: MatchState,
    result?: MatchResult | null,
    startedAt?: Date | null,
    finishedAt?: Date | null
};