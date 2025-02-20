import { MatchResult, MatchState, MatchStateEnum } from "@/domain/constants";
import { MatchModel } from "@/domain/models";

export class Match {
    constructor(
        private readonly model: MatchModel
    ) {}

    public get id(): string { return this.model.id; }
    public get code(): string { return this.model.code; }
    public get state(): MatchState { return this.model.state }
    public get result(): MatchResult | null | undefined { return this.model.result; }
    public get startedAt(): Date | null | undefined { return this.model.startedAt; }
    public get finishedAt(): Date | null | undefined { return this.model.finishedAt; }

    private set state(state: MatchState) { this.model.state = state; }
    private set startedAt(startedAt: Date) { this.model.startedAt = startedAt; }

    public static createNew(): Match { 
        const id = crypto.randomUUID();
        const code = id.substring(0, 8).toUpperCase();

        return new Match({
            id: id,
            code: code,
            state: MatchStateEnum.WaitingForPlayers
        });
    }

    public start(): void {
        if (this.state === MatchStateEnum.WaitingForPlayers) {
            this.state = MatchStateEnum.Ongoing;
            this.startedAt = new Date();
        }
    }
}