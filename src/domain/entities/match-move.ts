import { MatchMoveModel } from "@/domain/models";

export class MatchMove {
    constructor(
        private readonly model: MatchMoveModel
    ) {}

    public get matchId(): string { return this.model.matchId; }
    public get accountId(): string { return this.model.accountId; }
    public get turn(): number { return this.model.turn }
    public get symbolPosition(): number { return this.model.symbolPosition }
    public get movedAt(): Date { return this.model.movedAt; }
}