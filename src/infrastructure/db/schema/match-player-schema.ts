import { integer, pgTable, primaryKey, timestamp, unique } from "drizzle-orm/pg-core";
import { accountSchema } from "@/infrastructure/db/schema/account-schema";
import { matchSchema } from "@/infrastructure/db/schema/match-schema";
import { playerSymbolEnumSchema } from "@/infrastructure/db/schema/player-symbol-enum-schema";

export const matchPlayerSchema = pgTable('match_player', {
    matchId: integer().notNull().references(() => matchSchema.id),
    accountId: integer().notNull().references(() => accountSchema.id),
    playerSymbol: playerSymbolEnumSchema().notNull(),
    joinedAt: timestamp().defaultNow().notNull()
}, (table) => [
    primaryKey({ columns: [table.matchId, table.accountId] }),
    unique().on(table.matchId, table.playerSymbol)
]);