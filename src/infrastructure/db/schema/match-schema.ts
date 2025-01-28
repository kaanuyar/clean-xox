import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, check } from "drizzle-orm/pg-core";
import { MatchResult, MatchState } from "@/domain/models";

const matchStates = Object.values(MatchState).map(state => `'${state.toString()}'`).join(',');
const matchResults = Object.values(MatchResult).map(result => `'${result.toString()}'`).join(',');

export const matchSchema = pgTable('match', {
    id: serial().primaryKey(),
    code: text().unique().notNull(),
    state: text().notNull(),
    result: text(),
    started_at: timestamp(),
    finished_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp()
}, (table) => [
    check('state_check', sql`${table.state} IN (${sql.raw(matchStates)})`),
    check('result_check', sql`${table.result} IN (${sql.raw(matchResults)})`),
]);