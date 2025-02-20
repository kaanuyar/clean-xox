import { InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { matchResultEnumSchema, matchStateEnumSchema } from "@/infrastructure/db/schema/enums";
import { enforceTypeEquality } from "@/infrastructure/db/helpers";
import { Match } from "@/domain/entities";

export const matchSchema = pgTable('match', {
    id: uuid().defaultRandom().primaryKey(),
    code: text().unique().notNull(),
    state: matchStateEnumSchema().notNull(),
    result: matchResultEnumSchema(),
    startedAt: timestamp({ withTimezone: true }),
    finishedAt: timestamp({ withTimezone: true }),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true })
});

type MatchSchemaType = Omit<InferSelectModel<typeof matchSchema>, 'createdAt' | 'updatedAt'>;
enforceTypeEquality<Match, MatchSchemaType>();