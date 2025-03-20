import { Controller, HttpResponse } from "@/presentation/protocols";
import { CreateMatchUsecase } from "@/application/usecases";
import { CreateMatchResponse } from "@/presentation/contracts";
import { ok } from "@/presentation/helpers";

export class CreateMatchController implements Controller {
    constructor(
        private readonly createMatchUsecase: CreateMatchUsecase
    ) {}

    async handle(_request: CreateMatchController.Params): Promise<HttpResponse<CreateMatchController.Result>> {
        const matchCode = await this.createMatchUsecase.createMatch();
        return ok(matchCode);
    }
}

export namespace CreateMatchController {
    export type Params = { accountId: string };
    export type Result = CreateMatchResponse;
}