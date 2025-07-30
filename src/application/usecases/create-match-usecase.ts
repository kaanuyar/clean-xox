import { ServerError } from "@/application/errors";
import { AddMatchRepository } from "@/application/abstractions/db/match";
import { Match } from "@/domain/entities";

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