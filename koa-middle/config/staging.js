module.exports = {
  port: '3002',
  host: 'http://jartto.staging.wang',
  winston: {
    info: {
        level: 'info',
        filename: '/data/log/h5/info/app-info-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        json: true,
        maxSize: '20m',
        maxFiles: '14d',
    },
    error: {
        level: 'error',
        filename: '/data/log/h5/error/app-error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        json: true,
        maxSize: '20m',
        maxFiles: '14d',
    },
  },
}