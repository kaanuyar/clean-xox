import { JoinMatchUsecase } from "@/application/usecases";
import { JoinMatchRequest } from "@/presentation/contracts";
import { Controller, HttpResponse } from "@/presentation/abstractions";
import { ContextModel } from "@/application/models";
import { noContent } from "@/presentation/helpers";

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