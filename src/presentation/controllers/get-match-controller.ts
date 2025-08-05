import { GetMatchUsecase } from "@/src/application/usecases";
import { MatchSession } from "@/src/domain/entities";
import { GetMatchRequest, GetMatchResponse } from "@/src/presentation/contracts";
import { Controller, HttpResponse } from "@/src/presentation/abstractions"
import { ContextModel } from "@/src/application/models";
import { ok } from "@/src/presentation/helpers"

export class GetMatchController implements Controller {
    constructor(
        private readonly getMatchUsecase: GetMatchUsecase
    ) {}

    public async handle(request: GetMatchController.Params): Promise<HttpResponse<GetMatchController.Result>> {
        const { code } = request;
        const { match: matchSession } = await this.getMatchUsecase.getMatch({ matchCode: code });
        
        return ok(this.toResult(matchSession));
    }

    private toResult(matchSession: MatchSession): GetMatchController.Result {
        const { match, game } = matchSession;
 
        return {
            code: match.code,
            state: match.state,
            result: match.result,
            game: {
                board: game.board.tiles,
                turnsPlayed: game.turn.value,
                symbolToPlay: matchSession.getSymbolToPlay()
            }
        };
    }
}

export namespace GetMatchController {
    export type Params = GetMatchRequest & ContextModel;
    export type Result = GetMatchResponse;
}