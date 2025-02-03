import { PlayerSymbol } from "@/domain/models";

export type MatchPlayerModel = {
    matchId: number
    accountId: number
    playerSymbol: PlayerSymbol
    joinedAt?: Date
};