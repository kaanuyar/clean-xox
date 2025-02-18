import { pgEnum } from "drizzle-orm/pg-core";
import { PlayerSymbol, PlayerSymbolEnum } from "@/domain/constants";

const playerSymbolEnumValues = Object.values(PlayerSymbolEnum) as [PlayerSymbol, ...PlayerSymbol[]];
export const playerSymbolEnumSchema = pgEnum('player_symbol', playerSymbolEnumValues);