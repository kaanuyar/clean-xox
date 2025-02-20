import { MatchSession } from "@/domain/entities";

export interface LoadMatchWithPlayersByCodeRepository {
    load: (code: LoadMatchWithPlayersByCodeRepository.Params) => Promise<LoadMatchWithPlayersByCodeRepository.Result>
}

export namespace LoadMatchWithPlayersByCodeRepository {
    export type Params = string;
    export type Result = MatchSession | null;
}