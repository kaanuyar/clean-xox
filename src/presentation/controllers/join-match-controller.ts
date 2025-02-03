import { JoinMatchUsecase } from "@/application/usecases";
import { ok } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class JoinMatchController implements Controller {
    constructor(
        private readonly joinMatchUsecase: JoinMatchUsecase
    ) {}

    async handle(request: JoinMatchController.Params): Promise<HttpResponse> {
        const { code, accountId } = request;
        const success = await this.joinMatchUsecase.joinMatch({
            matchCode: code,
            accountId
        });

        return ok(success);
    }
}

export namespace JoinMatchController {
    export type Params = {
        code: string,
        accountId: number
    };
}