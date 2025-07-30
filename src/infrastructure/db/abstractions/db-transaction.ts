import { DbContext } from "@/infrastructure/db/abstractions/db-context";

export type DbTransaction = Parameters<Parameters<DbContext["transaction"]>[0]>[0];