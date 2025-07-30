import { Match } from "@/domain/entities";

export interface UpdateMatchByCodeRepository {
    update: (data: UpdateMatchByCodeRepository.Params) => Promise<UpdateMatchByCodeRepository.Result>
}

export namespace UpdateMatchByCodeRepository {
    export type Params = Match;
    export type Result = Match | null;
}