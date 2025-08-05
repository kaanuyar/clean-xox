import { Logger } from "@/src/application/abstractions/logging";
import { pino, Logger as PinoLogger, LoggerOptions } from 'pino'

export class ConsoleLogger implements Logger {
    private readonly logger: PinoLogger;

    constructor(jsonLogEnable: boolean) {
        const loggerOptions: LoggerOptions = this.formatterOptions(jsonLogEnable);
        this.logger = pino(loggerOptions);
    }
    
    public info(message: string): void {
        this.logger.info(message);
    }

    public warn(message: string): void {
        this.logger.warn(message);
    }

    public error(reason: string | Error): void {
        this.logger.error(reason);
    }

    private formatterOptions(jsonLogEnable: boolean): LoggerOptions {
        const prettyFormatter = {
            transport: {
                target: 'pino-pretty'
            }
        };

        return jsonLogEnable ? {} : prettyFormatter;
    }
}