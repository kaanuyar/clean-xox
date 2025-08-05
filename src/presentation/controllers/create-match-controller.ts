import { Controller, HttpResponse } from "@/src/presentation/abstractions";
import { CreateMatchUsecase } from "@/src/application/usecases";
import { CreateMatchResponse } from "@/src/presentation/contracts";
import { ContextModel } from "@/src/application/models";
import { ok } from "@/src/presentation/helpers";

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