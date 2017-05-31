const log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/access.log',
            maxLogSize: 1024000,
            backups: 3,
            category: 'express'
        },
        {
            type: 'file', //文件输出
            filename: 'logs/console.log',
            maxLogSize: 1024000,
            backups: 3,
            category: 'console'
        }
    ],
    replaceConsole: true
});
const expressLogger = log4js.getLogger('express');
const consoleLogger = log4js.getLogger('console');
consoleLogger.setLevel(log4js.levels.INFO); // 设置输出等级

console.trace = consoleLogger.trace.bind(consoleLogger); // 替换系统的console
console.debug = consoleLogger.debug.bind(consoleLogger);
console.log = consoleLogger.info.bind(consoleLogger);
console.info = consoleLogger.info.bind(consoleLogger);
console.warn = consoleLogger.warn.bind(consoleLogger);
console.error = consoleLogger.error.bind(consoleLogger);

module.exports = {
    log4js,
    expressLogger
};