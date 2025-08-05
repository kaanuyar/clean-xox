import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { enforceTypeEquality } from "@/src/infrastructure/db/helpers";
import { Account } from "@/src/domain/entities";

export const accountSchema = pgTable('account', {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    email: text().unique().notNull(),
    password: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
});

type AccountSchemaType = Omit<InferSelectModel<typeof accountSchema>, 'createdAt' | 'updatedAt'>;
enforceTypeEquality<Account, AccountSchemaType>();