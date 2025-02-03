import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const accountSchema = pgTable('account', {
    id: serial().primaryKey(),
    name: text().notNull(),
    email: text().unique().notNull(),
    password: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
});