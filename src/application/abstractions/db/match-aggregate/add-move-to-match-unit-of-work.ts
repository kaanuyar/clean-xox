import { Match, MatchMove } from "@/src/domain/entities";

export interface AddMoveToMatchUnitOfWork {
    addMove: (data: AddMoveToMatchUnitOfWork.Params) => Promise<AddMoveToMatchUnitOfWork.Result>
}

export namespace AddMoveToMatchUnitOfWork {
    export type Params = {
        match: Match,
        matchMove: MatchMove,
        skipCondition: boolean
    };
    export type Result = boolean;
}