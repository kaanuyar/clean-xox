import { DbContext } from "@/src/infrastructure/db/abstractions/db-context";

export type DbTransaction = Parameters<Parameters<DbContext["transaction"]>[0]>[0];