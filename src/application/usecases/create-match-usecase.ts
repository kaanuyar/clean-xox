import { ServerError } from "@/src/application/errors";
import { AddMatchRepository } from "@/src/application/abstractions/db/match";
import { Match } from "@/src/domain/entities";

export class CreateMatchUsecase {
    constructor(
        private readonly addMatchRepository: AddMatchRepository
    ) {}

    public async createMatch(): Promise<CreateMatchUsecase.Result> {
        const match = Match.createNew();
        const createdMatch = await this.addMatchRepository.add(match);
        if (!createdMatch) {
            throw new ServerError();
        }
        
        return { matchCode: createdMatch.code };
    }
}

export namespace CreateMatchUsecase {
    export type Result = { matchCode: string }
}