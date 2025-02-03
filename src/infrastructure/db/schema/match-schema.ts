import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { matchResultEnumSchema } from "@/infrastructure/db/schema/match-result-enum-schema";
import { matchStateEnumSchema } from "@/infrastructure/db/schema/match-state-enum-schema";

export const matchSchema = pgTable('match', {
    id: serial().primaryKey(),
    code: text().unique().notNull(),
    state: matchStateEnumSchema().notNull(),
    result: matchResultEnumSchema(),
    startedAt: timestamp(),
    finishedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
});