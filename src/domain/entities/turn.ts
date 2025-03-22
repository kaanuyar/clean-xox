import { InvalidTurnError } from "@/domain/errors";

export class Turn {
    private readonly minTurn: number = 0;
    private readonly maxTurn: number = 9;

    private _value: number = this.minTurn;
    
    constructor(turn?: number) {
        this.value = turn ?? this.minTurn;
    }

    public get value(): number { return this._value; }
    public set value(turn: number) {
        if (turn < this.minTurn || turn > this.maxTurn) {
            throw new InvalidTurnError();
        }

        this._value = turn;
    }

    public isLast(): boolean {
        return this.value === this.maxTurn;
    }
}