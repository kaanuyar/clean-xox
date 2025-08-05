import { MatchSession } from "@/src/domain/entities";

export interface LoadMatchSessionByCodeRepository {
    load: (code: LoadMatchSessionByCodeRepository.Params) => Promise<LoadMatchSessionByCodeRepository.Result>
}

export namespace LoadMatchSessionByCodeRepository {
    export type Params = string;
    export type Result = MatchSession | null;
}