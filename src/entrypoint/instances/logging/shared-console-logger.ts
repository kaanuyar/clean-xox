import { Logger } from "@/application/abstractions/logging";
import { ConsoleLogger } from "@/infrastructure/logging";
import { env } from '@/entrypoint/config';

const consoleLogger: Logger = new ConsoleLogger(env.jsonLogEnable);

export default consoleLogger;