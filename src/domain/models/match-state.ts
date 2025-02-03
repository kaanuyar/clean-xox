export const MatchStateEnum = {
    WaitingForPlayers: 'Waiting for players',
    Ongoing: 'Ongoing',
    Finished: 'Finished'
} as const;

export type MatchState = typeof MatchStateEnum[keyof typeof MatchStateEnum];