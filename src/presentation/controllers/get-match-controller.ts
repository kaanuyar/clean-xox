import { GetMatchUsecase } from "@/application/usecases";
import { MatchSession } from "@/domain/entities";
import { GetMatchRequest, GetMatchResponse } from "@/presentation/contracts";
import { Controller, HttpResponse } from "@/presentation/protocols"
import { ContextModel } from "@/application/models";
import { ok } from "@/presentation/helpers"

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