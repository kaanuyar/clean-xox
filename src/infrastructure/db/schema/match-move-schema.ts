import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { matchSchema } from "@/infrastructure/db/schema/match-schema";
import { accountSchema } from "@/infrastructure/db/schema/account-schema";

export const matchMoveSchema = pgTable('match_move', {
    matchId: integer().references(() => matchSchema.id),
    accountId: integer().references(() => accountSchema.id),
    turn: integer().notNull(),
    symbolPlacement: integer().notNull(),
    movedAt: timestamp().defaultNow().notNull()
}, (table) => [
    primaryKey({ columns: [table.matchId, table.turn] })
]);