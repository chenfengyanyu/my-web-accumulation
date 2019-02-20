module.exports = {
  port: 3001,
  winston: {
    info: {
        level: 'info',
        filename: 'log/info/app-info-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        json: true,
        maxSize: '20m',
        maxFiles: '14d',
    },
    error: {
        level: 'error',
        filename: 'log/error/app-error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        json: true,
        maxSize: '20m',
        maxFiles: '14d',
    },
  },
};