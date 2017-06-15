const utils = require('./utils');

module.exports = [utils.getUserInfo, utils.getApiRegex, utils.getPreValid, utils.getPostValid, utils.getPreDataGenerator, utils.getPostDataGenerator, // 预处理mock需要的规则
    utils.onCapture, utils.onValid, utils.onDataGenerator, utils.onFetchData, utils.proxy];
