import { ServerError } from "@/application/errors";
import { CodeGenerator } from "@/application/protocols/cryptography";
import { AddMatchRepository } from "@/application/protocols/db/match";
import { MatchStateEnum } from "@/domain/constants";

export class CreateMatchUsecase {
    constructor(
        private readonly addMatchRepository: AddMatchRepository,
        private readonly codeGenerator: CodeGenerator
    ) {}

    async createMatch(): Promise<CreateMatchUsecase.Result> {
        const initialMatch = {
            state: MatchStateEnum.WaitingForPlayers,
            code: this.codeGenerator.generateCode()
        };

        const match = await this.addMatchRepository.add(initialMatch);
        if (!match) {
            throw new ServerError();
        }
        
        return { matchCode: match.code };
    }
}

export namespace CreateMatchUsecase {
    export type Result = { matchCode: string }
}