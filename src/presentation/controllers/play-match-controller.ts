import { PlayMatchUsecase } from "@/src/application/usecases";
import { PlayMatchRequest } from "@/src/presentation/contracts";
import { Controller, HttpResponse } from "@/src/presentation/abstractions"
import { ContextModel } from "@/src/application/models";
import { noContent } from "@/src/presentation/helpers"

export class PlayMatchController implements Controller {
    constructor(
        private readonly playMatchUsecase: PlayMatchUsecase
    ) {}

    public async handle(request: PlayMatchController.Params): Promise<HttpResponse> {
        const { symbolPosition, code, accountId } = request;
        await this.playMatchUsecase.playMatch({
            symbolPosition,
            matchCode: code,
            accountId
        });
        
        return noContent();
    }
}

export namespace PlayMatchController {
    export type Params = PlayMatchRequest & ContextModel;
}