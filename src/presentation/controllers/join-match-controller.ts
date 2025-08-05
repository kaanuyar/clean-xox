import { JoinMatchUsecase } from "@/src/application/usecases";
import { JoinMatchRequest } from "@/src/presentation/contracts";
import { Controller, HttpResponse } from "@/src/presentation/abstractions";
import { ContextModel } from "@/src/application/models";
import { noContent } from "@/src/presentation/helpers";

export class JoinMatchController implements Controller {
    constructor(
        private readonly joinMatchUsecase: JoinMatchUsecase
    ) {}

    public async handle(request: JoinMatchController.Params): Promise<HttpResponse> {
        const { code, accountId } = request;
        await this.joinMatchUsecase.joinMatch({
            matchCode: code,
            accountId
        });

        return noContent();
    }
}

export namespace JoinMatchController {
    export type Params = JoinMatchRequest & ContextModel;
}