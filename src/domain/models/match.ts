export type MatchModel = {
    code: string,
    state: MatchState,
    result?: MatchResult | null,
    startedAt?: Date | null,
    finishedAt?: Date | null
};

export enum MatchState {
    WaitingPlayers = 'waiting_players',
    Ongoing = 'ongoing',
    Finished = 'finished'
};

export enum MatchResult {
    X = 'x',
    O = 'o',
    Draw = 'draw'
};

export enum PlayerSymbol {
    X = 'x',
    O = 'o'
};