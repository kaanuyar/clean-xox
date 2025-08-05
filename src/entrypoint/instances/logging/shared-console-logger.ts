import { Logger } from "@/src/application/abstractions/logging";
import { ConsoleLogger } from "@/src/infrastructure/logging";
import { env } from '@/src/entrypoint/config';

const consoleLogger: Logger = new ConsoleLogger(env.jsonLogEnable);

export default consoleLogger;