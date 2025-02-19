import { integer, uuid, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { matchSchema } from "@/infrastructure/db/schema/tables/match-schema";
import { accountSchema } from "@/infrastructure/db/schema/tables/account-schema";

export const matchMoveSchema = pgTable('match_move', {
    matchId: uuid().notNull().references(() => matchSchema.id),
    accountId: uuid().notNull().references(() => accountSchema.id),
    turn: integer().notNull(),
    symbolPlacement: integer().notNull(),
    movedAt: timestamp({ withTimezone: true }).defaultNow().notNull()
}, (table) => [
    primaryKey({ columns: [table.matchId, table.turn] })
]);