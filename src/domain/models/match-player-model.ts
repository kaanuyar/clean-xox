import { PlayerSymbol } from "@/domain/constants";

export type MatchPlayerModel = {
    matchId: string
    accountId: string
    playerSymbol: PlayerSymbol
    joinedAt: Date
};