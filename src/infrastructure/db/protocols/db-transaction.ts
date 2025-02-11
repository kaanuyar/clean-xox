import { DbContext } from "@/infrastructure/db/protocols/db-context";

export type DbTransaction = Parameters<Parameters<DbContext["transaction"]>[0]>[0];