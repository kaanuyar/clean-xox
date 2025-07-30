import { MatchMove } from "@/domain/entities";

export interface AddMatchMoveRepository {
    add: (data: AddMatchMoveRepository.Params) => Promise<AddMatchMoveRepository.Result>
}

export namespace AddMatchMoveRepository {
    export type Params = MatchMove;
    export type Result = MatchMove | null;
}