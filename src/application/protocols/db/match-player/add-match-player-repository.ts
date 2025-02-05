import { MatchPlayerModel } from "@/domain/models"

export interface AddMatchPlayerRepository {
    add: (data: AddMatchPlayerRepository.Params) => Promise<AddMatchPlayerRepository.Result>
}

export namespace AddMatchPlayerRepository {
    export type Params = MatchPlayerModel;
    export type Result = MatchPlayerModel | null;
}