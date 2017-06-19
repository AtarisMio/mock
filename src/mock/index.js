const utils = require('./utils');

module.exports = [utils.getUserInfo, utils.getApiRegex, utils.getPreValid, utils.getPostValid, utils.getPreDataGenerator, utils.getPostDataGenerator, // 预处理mock需要的规则
    utils.onPreCapture, utils.onPreValid, utils.onPreDataGenerator, utils.onFetchData, utils.onPostDataGenerator, utils.onPostValid, utils.onPostCapture];
