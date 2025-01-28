import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { matchSchema } from "@/infrastructure/db/schema/match-schema";
import { accountSchema } from "@/infrastructure/db/schema/account-schema";

export const matchMoveSchema = pgTable('match_move', {
    match_id: integer().references(() => matchSchema.id),
    account_id: integer().references(() => accountSchema.id),
    turn: integer().notNull(),
    symbol_placement: integer().notNull(),
    moved_at: timestamp().defaultNow().notNull()
}, (table) => [
    primaryKey({ columns: [table.match_id, table.turn] })
]);