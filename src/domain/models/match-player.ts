import { PlayerSymbol } from "@/domain/models/player-symbol";

export type MatchPlayerModel = {
    matchId: number
    accountId: number
    playerSymbol: PlayerSymbol
    joinedAt?: Date
};