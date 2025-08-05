import { Match, MatchPlayer } from "@/src/domain/entities";

export interface AddPlayerToMatchUnitOfWork {
    addPlayer: (data: AddPlayerToMatchUnitOfWork.Params) => Promise<AddPlayerToMatchUnitOfWork.Result>
}

export namespace AddPlayerToMatchUnitOfWork {
    export type Params = {
        match: Match,
        matchPlayer: MatchPlayer,
        skipCondition: boolean
    };
    export type Result = boolean;
}