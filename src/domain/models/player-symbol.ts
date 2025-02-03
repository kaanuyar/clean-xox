export const PlayerSymbolEnum = {
    X: 'X',
    O: 'O'
} as const;

export type PlayerSymbol = typeof PlayerSymbolEnum[keyof typeof PlayerSymbolEnum];