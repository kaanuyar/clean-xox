import { MatchModel } from "@/domain/models"

export interface AddMatchRepository {
    add: (data: AddMatchRepository.Params) => Promise<AddMatchRepository.Result>
}

export namespace AddMatchRepository {
    export type Params = Omit<MatchModel, 'id'>;
    export type Result = MatchModel | null;
}