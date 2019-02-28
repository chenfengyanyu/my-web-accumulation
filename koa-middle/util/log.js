const winston = require('winston');
require('winston-daily-rotate-file');

const cfg = require('../config');
const { transports, format, createLogger } = winston;

class Logger {
    constructor(name) {
        this._logger = createLogger({
            format: format.combine(
                winston.format(function dynamicContent(info) {
                    info.module = name;
                    return info;
                })(),
                format.timestamp(),
                format.json()
            ),
            transports: [
                new (transports.DailyRotateFile)(cfg.winston.info),
                new (transports.DailyRotateFile)(cfg.winston.error),
            ],
        });
    }
    info(...info) {
        if (cfg.isDebug) {
            console.log(info);
        }
        this._logger.info(info);
    }
    error(...error) {
        this._logger.error(error);
    }
    debug(...info) {
        if (cfg.isDebug) {
            console.log(info);
        }
    }
    warn(...warn) {
        this._logger.warn(warn);
    }
}


const getLogger = (name) => {
    return new Logger(name);
};
module.exports.getLogger = getLogger;