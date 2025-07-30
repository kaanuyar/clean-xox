import { Match } from "@/domain/entities";

export interface AddMatchRepository {
    add: (data: AddMatchRepository.Params) => Promise<AddMatchRepository.Result>
}

export namespace AddMatchRepository {
    export type Params = Match;
    export type Result = Match | null;
}