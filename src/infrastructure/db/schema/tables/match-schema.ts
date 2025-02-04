import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { matchResultEnumSchema, matchStateEnumSchema } from "@/infrastructure/db/schema/enums";

export const matchSchema = pgTable('match', {
    id: serial().primaryKey(),
    code: text().unique().notNull(),
    state: matchStateEnumSchema().notNull(),
    result: matchResultEnumSchema(),
    startedAt: timestamp({ withTimezone: true }),
    finishedAt: timestamp({ withTimezone: true }),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
});