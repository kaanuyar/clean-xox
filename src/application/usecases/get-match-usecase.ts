import { MatchNotFoundError } from "@/src/application/errors";
import { LoadMatchSessionByCodeRepository } from "@/src/application/abstractions/db/match"
import { MatchSession } from "@/src/domain/entities";

export class GetMatchUsecase {
    constructor(
        private readonly loadMatchSessionByCodeRepository: LoadMatchSessionByCodeRepository,
    ) {}
    
    public async getMatch(params: GetMatchUsecase.Params): Promise<GetMatchUsecase.Result> {
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