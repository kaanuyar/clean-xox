import env from '@/entrypoint/config/env'
import { MongoHelper } from "@/infrastructure/db/mongodb"

export const mongoSetup = async (): Promise<void> => {
    await MongoHelper.connect(env.mongoUrl);
}