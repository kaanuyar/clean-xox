import { Controller, HttpResponse } from "@/presentation/abstractions";
import { CreateMatchUsecase } from "@/application/usecases";
import { CreateMatchResponse } from "@/presentation/contracts";
import { ContextModel } from "@/application/models";
import { ok } from "@/presentation/helpers";

export class CreateMatchController implements Controller {
    constructor(
        private readonly createMatchUsecase: CreateMatchUsecase
    ) {}

    public async handle(_request: CreateMatchController.Params): Promise<HttpResponse<CreateMatchController.Result>> {
        const matchCode = await this.createMatchUsecase.createMatch();
        return ok(matchCode);
    }
}

export namespace CreateMatchController {
    export type Params = ContextModel;
    export type Result = CreateMatchResponse;
}