import { MatchModel } from "@/domain/models"

export interface AddMatchRepository {
    add: (data: AddMatchRepository.Params) => Promise<AddMatchRepository.Result>
}

export namespace AddMatchRepository {
    export type Params = MatchModel;
    export type Result = MatchModel | null;
}