'use strict';
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
        // 建表顺序很重要，外键关联的表要先建
        await methods.createTables(models.user, models.token, models.api, models.valid, models.dataGenerator);
        console.warn('Operation is done! Has resync all models!');
    } else {
        console.warn('Operation has been canceled!');
    }
    rl.close();
    process.exit(0);
});