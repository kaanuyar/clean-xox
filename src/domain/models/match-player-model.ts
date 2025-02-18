import { PlayerSymbol } from "@/domain/constants";

export type MatchPlayerModel = {
    matchId: number
    accountId: number
    playerSymbol: PlayerSymbol
    joinedAt?: Date
};