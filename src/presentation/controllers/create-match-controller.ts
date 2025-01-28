import { Controller, HttpResponse } from "@/presentation/protocols";
import { CreateMatchUsecase } from "@/application/usecases";
import { ok } from "@/presentation/helpers";

export class CreateMatchController implements Controller {
    constructor(
        private readonly createMatchUsecase: CreateMatchUsecase
    ) {}

    async handle(_request: CreateMatchController.Params): Promise<HttpResponse> {
        const matchCode = await this.createMatchUsecase.createMatch();
        return ok(matchCode);
    }
}

export namespace CreateMatchController {
    export type Params = { accountId: number };
}