import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const accountSchema = pgTable('account', {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    email: text().unique().notNull(),
    password: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
});