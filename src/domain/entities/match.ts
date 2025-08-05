import { MatchResult, MatchState, MatchStateEnum } from "@/src/domain/constants";
import { MatchModel } from "@/src/domain/models";

export class Match {
    constructor(
        private readonly model: MatchModel
    ) {}

    public get id(): string { return this.model.id; }
    public get code(): string { return this.model.code; }
    public get state(): MatchState { return this.model.state }
    public get result(): MatchResult | null { return this.model.result ?? null; }
    public get startedAt(): Date | null { return this.model.startedAt ?? null; }
    public get finishedAt(): Date | null { return this.model.finishedAt ?? null; }

    private set state(state: MatchState) { this.model.state = state; }
    private set result(result: MatchResult) { this.model.result = result; }
    private set startedAt(startedAt: Date) { this.model.startedAt = startedAt; }
    private set finishedAt(finishedAt: Date) { this.model.finishedAt = finishedAt; }

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

    public finish(matchResult: MatchResult): void {
        if (this.state === MatchStateEnum.Ongoing) {
            this.state = MatchStateEnum.Finished;
            this.result = matchResult;
            this.finishedAt = new Date();
        }
    }
}