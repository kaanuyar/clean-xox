import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const accountSchema = pgTable('account', {
    id: serial().primaryKey(),
    name: text().notNull(),
    email: text().unique().notNull(),
    password: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
});