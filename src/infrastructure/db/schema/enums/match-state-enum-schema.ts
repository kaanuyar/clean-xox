import { pgEnum } from "drizzle-orm/pg-core";
import { MatchState, MatchStateEnum } from "@/domain/constants";

const matchStateEnumValues = Object.values(MatchStateEnum) as [MatchState, ...MatchState[]];
export const matchStateEnumSchema = pgEnum('match_state', matchStateEnumValues);