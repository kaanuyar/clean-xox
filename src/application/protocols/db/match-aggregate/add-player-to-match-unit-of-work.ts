import { MatchModel, MatchPlayerModel } from "@/domain/models"

export interface AddPlayerToMatchUnitOfWork {
    addPlayer: (data: AddPlayerToMatchUnitOfWork.Params) => Promise<AddPlayerToMatchUnitOfWork.Result>
}

export namespace AddPlayerToMatchUnitOfWork {
    export type Params = {
        match: MatchModel,
        matchPlayer: MatchPlayerModel,
        skipCondition: boolean
    };
    export type Result = boolean;
}