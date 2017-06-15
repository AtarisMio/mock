'use strict';
const args = process.argv.splice(2);

switch (true) {
    case args.includes('create-table'): {
        // 创建表
        require('./creatTable');
        break;
    }
    case args.includes('resync'): {
        // todo
        break;
    }
    default: {
        // 正常运行
        require('./defalut');
        break;
    }
}
