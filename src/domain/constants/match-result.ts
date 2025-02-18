export const MatchResultEnum = {
    X: 'X',
    O: 'O',
    Draw: 'Draw'
} as const;

export type MatchResult = typeof MatchResultEnum[keyof typeof MatchResultEnum];