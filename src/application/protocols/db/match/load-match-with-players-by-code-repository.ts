import { MatchModel, MatchPlayerModel } from "@/domain/models"

export interface LoadMatchWithPlayersByCodeRepository {
    load: (code: LoadMatchWithPlayersByCodeRepository.Params) => Promise<LoadMatchWithPlayersByCodeRepository.Result>
}

export namespace LoadMatchWithPlayersByCodeRepository {
    export type Params = string;
    export type Result = {
        match: MatchModel,
        players: MatchPlayerModel[]
    } | null;
}