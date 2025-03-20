import { MatchResultEnum, MatchStateEnum, PlayerSymbolEnum } from "@/domain/constants";
import z from "zod";

export const GetMatchRequestSchema = z.object({
    code: z
        .string({ invalid_type_error: 'Code must be a string' })
        .length(8, { message: 'Code must be exactly 8 characters long' })
});

export const GetMatchResponseSchema = z.object({
    code: z.string(),
    state: z.nativeEnum(MatchStateEnum),
    result: z.nativeEnum(MatchResultEnum).nullable(),
    game: z.object({
        board: z.array(z.nativeEnum(PlayerSymbolEnum).nullable()),
        turnsPlayed: z.number(),
        symbolToPlay: z.nativeEnum(PlayerSymbolEnum).nullable()
    })
});

export type GetMatchRequest = z.infer<typeof GetMatchRequestSchema>;
export type GetMatchResponse = z.infer<typeof GetMatchResponseSchema>;