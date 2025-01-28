import { sql } from "drizzle-orm";
import { check, integer, pgTable, primaryKey, text, timestamp, unique } from "drizzle-orm/pg-core";
import { accountSchema } from "@/infrastructure/db/schema/account-schema";
import { matchSchema } from "@/infrastructure/db/schema/match-schema";
import { PlayerSymbol } from "@/domain/models";

const playerSymbols = Object.values(PlayerSymbol).map(symbol => `'${symbol.toString()}'`).join(',');

export const matchPlayerSchema = pgTable('match_player', {
    match_id: integer().references(() => matchSchema.id),
    account_id: integer().references(() => accountSchema.id),
    player_symbol: text().notNull(),
    joined_at: timestamp().defaultNow().notNull()
}, (table) => [
    primaryKey({ columns: [table.match_id, table.account_id] }),
    unique().on(table.match_id, table.player_symbol),  
    check('check_player_symbol', sql`${table.player_symbol} IN (${sql.raw(playerSymbols)})`)
]);