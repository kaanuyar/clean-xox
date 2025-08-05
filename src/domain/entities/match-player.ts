import { PlayerSymbol } from "@/src/domain/constants";
import { MatchPlayerModel } from "@/src/domain/models";

export class MatchPlayer {
    constructor(
        private readonly model: MatchPlayerModel
    ) {}

    public get matchId(): string { return this.model.matchId; }
    public get accountId(): string { return this.model.accountId; }
    public get playerSymbol(): PlayerSymbol { return this.model.playerSymbol }
    public get joinedAt(): Date { return this.model.joinedAt; }
}