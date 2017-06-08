'use strict';
const args = process.argv.splice(2);
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { api_prefix } = require('./../config').mock;
const app = express();

const { log4js, expressLogger } = require('./utils/logger');

switch (true) {
    case args.includes('create-table'): {
        // 创建表
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        console.warn('Dangerous operations!');
        rl.question(`This operation is very dangerous! Will drop ALL tables in models.
此项操作及其危险！会Drop所有在models文件夹内的表.
Please comfirm you are REALLY want to do this? (Y/n)
请确认你真的想进行这项操作? (Y/n)\n`, async (answer) => {
            if (answer.match(/^y(es)?$/i)) {
                console.warn('Start resync all models!');
                const { methods, models } = require('./models/index');
                await methods.createTables(...Object.values(models));
                console.warn('Operation is done! Has resync all models!');
            } else {
                console.warn('Operation has been canceled!');
            }
            rl.close();
            process.exit(0);
        });
        break;
    }
    case args.includes('resync'): {
        // todo
        break;
    }
    default: {
        // 正常运行
        app.use(log4js.connectLogger(expressLogger, { level: log4js.levels.INFO }));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use('/static', express.static('src/static'));
        app.use('/mock', require('./server/routers'));

        app.use(`/${api_prefix || ''}`, require('./mock'));
        if (!module.parent) {
            app.listen(3000, function () {
                console.log('App listening on port 3000!');
            });
        }

        break;
    }
}
