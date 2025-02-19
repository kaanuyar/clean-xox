import { JoinMatchUsecase } from "@/application/usecases";
import { noContent } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class JoinMatchController implements Controller {
    constructor(
        private readonly joinMatchUsecase: JoinMatchUsecase
    ) {}

    async handle(request: JoinMatchController.Params): Promise<HttpResponse> {
        const { code, accountId } = request;
        await this.joinMatchUsecase.joinMatch({
            matchCode: code,
            accountId
        });

        return noContent();
    }
}

export namespace JoinMatchController {
    export type Params = {
        code: string,
        accountId: string
    };
}