import { MatchPlayer } from "@/domain/entities";

export interface AddMatchPlayerRepository {
    add: (data: AddMatchPlayerRepository.Params) => Promise<AddMatchPlayerRepository.Result>
}

export namespace AddMatchPlayerRepository {
    export type Params = MatchPlayer;
    export type Result = MatchPlayer | null;
}