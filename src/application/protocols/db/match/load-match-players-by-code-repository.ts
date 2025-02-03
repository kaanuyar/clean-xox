import { MatchModel, MatchPlayerModel } from "@/domain/models"

export interface LoadMatchPlayersByCodeRepository {
    load: (code: LoadMatchPlayersByCodeRepository.Params) => Promise<LoadMatchPlayersByCodeRepository.Result>
}

export namespace LoadMatchPlayersByCodeRepository {
    export type Params = string;
    export type Result = {
        match: MatchModel,
        players: MatchPlayerModel[]
    } | null;
}