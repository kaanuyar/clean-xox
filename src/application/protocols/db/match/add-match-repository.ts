import { MatchModel } from "@/domain/models"

export interface AddMatchRepository {
    addMatch: (data: AddMatchRepository.Params) => Promise<AddMatchRepository.Result>
}

export namespace AddMatchRepository {
    export type Params = Omit<MatchModel, 'id'>;
    export type Result = MatchModel | null;
}