import { MatchNotFoundError } from "@/application/errors";
import { LoadMatchSessionByCodeRepository } from "@/application/protocols/db/match"
import { MatchSession } from "@/domain/entities";

export class GetMatchUsecase {
    constructor(
        private readonly loadMatchSessionByCodeRepository: LoadMatchSessionByCodeRepository,
    ) {}
    
    async getMatch(params: GetMatchUsecase.Params): Promise<GetMatchUsecase.Result> {
        const { matchCode } = params;
        const matchSession = await this.loadMatchSessionByCodeRepository.load(matchCode);
        if (!matchSession) {
            throw new MatchNotFoundError();
        }

        return { match: matchSession };
    }
}

export namespace GetMatchUsecase {
    export type Params = { matchCode: string };
    export type Result = { match: MatchSession };
}