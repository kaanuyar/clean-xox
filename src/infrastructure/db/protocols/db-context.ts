import { drizzle } from "drizzle-orm/node-postgres";

export type DbContext = Omit<ReturnType<typeof drizzle>, '$client'>;