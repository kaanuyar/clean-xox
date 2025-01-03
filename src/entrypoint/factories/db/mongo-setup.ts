import env from "@/entrypoint/api/env"
import { MongoHelper } from "@/infrastructure/db/mongodb"

export const mongoSetup = async (): Promise<void> => {
    await MongoHelper.connect(env.mongoUrl);
}