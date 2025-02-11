import { MatchModel } from "@/domain/models"

export interface UpdateMatchByCodeRepository {
    update: (data: UpdateMatchByCodeRepository.Params) => Promise<UpdateMatchByCodeRepository.Result>
}

export namespace UpdateMatchByCodeRepository {
    export type Params = MatchModel;
    export type Result = MatchModel | null;
}