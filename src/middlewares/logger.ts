import { NextFunction, Request, Response } from "express";
import winston from "winston";
const { printf, timestamp, combine } = winston.format;

const logger = winston.createLogger({
    level: "info",
    format: combine(
        timestamp(),
        printf((info) => `${info.timestamp}   ${info.message}`)
    ),
    transports: [
        new winston.transports.File({
            filename: "app.log",
            dirname: "logs",
            level: "info",
        }),
        new winston.transports.File({
            filename: "err.log",
            dirname: "logs",
            level: "error",
        }),
    ],
});

const loggerMiddlware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method}\t${req.url}\t${req.headers.origin}`);
    console.log(`${req.method} ${req.path}`);
    next();
};

export { logger, loggerMiddlware };
