import { pgEnum } from "drizzle-orm/pg-core";
import { MatchResult, MatchResultEnum } from "@/src/domain/constants";

const matchResultEnumValues = Object.values(MatchResultEnum) as [MatchResult, ...MatchResult[]];
export const matchResultEnumSchema = pgEnum('match_result', matchResultEnumValues);