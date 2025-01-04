import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const accountSchema = pgTable('account', {
    id: serial().primaryKey(),
    name: text().notNull(),
    email: text().unique('email_idx').notNull(),
    password: text().notNull(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp()
});