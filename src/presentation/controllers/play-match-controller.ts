import { PlayMatchUsecase } from "@/application/usecases";
import { noContent } from "@/presentation/helpers"
import { Controller, HttpResponse } from "@/presentation/protocols"

export class PlayMatchController implements Controller {
    constructor(
        private readonly playMatchUsecase: PlayMatchUsecase
    ) {}

    async handle(request: PlayMatchController.Params): Promise<HttpResponse> {
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
    export type Params = {
        symbolPosition: number,
        code: string,
        accountId: string
    }
}