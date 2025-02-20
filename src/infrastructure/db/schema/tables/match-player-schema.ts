import { InferSelectModel } from "drizzle-orm";
import { uuid, pgTable, primaryKey, timestamp, unique } from "drizzle-orm/pg-core";
import { accountSchema } from "@/infrastructure/db/schema/tables/account-schema";
import { matchSchema } from "@/infrastructure/db/schema/tables/match-schema";
import { playerSymbolEnumSchema } from "@/infrastructure/db/schema/enums";
import { enforceTypeEquality } from "@/infrastructure/db/helpers";
import { MatchPlayer } from "@/domain/entities";

export const matchPlayerSchema = pgTable('match_player', {
    matchId: uuid().notNull().references(() => matchSchema.id),
    accountId: uuid().notNull().references(() => accountSchema.id),
    playerSymbol: playerSymbolEnumSchema().notNull(),
    joinedAt: timestamp({ withTimezone: true }).defaultNow().notNull()
}, (table) => [
    primaryKey({ columns: [table.matchId, table.accountId] }),
    unique().on(table.matchId, table.playerSymbol)
]);

type MatchPlayerSchemaType = InferSelectModel<typeof matchPlayerSchema>;
enforceTypeEquality<MatchPlayer, MatchPlayerSchemaType>();