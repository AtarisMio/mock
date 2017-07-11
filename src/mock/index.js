const utils = require('./utils');
const tense = require('./tense');

module.exports = [
    // start pretreatment 预处理mock需要的规则
    utils.getUserInfo,
    utils.getApiRegex,
    utils.getPreValid,
    utils.getPostValid,
    utils.getPreDataGenerator,
    utils.getPostDataGenerator,
    // end pretreatment
    // start treatment tense 处理数据时态
    tense.onPreCapture,
    tense.onPreValid,
    tense.onPreDataGenerator,
    tense.onFetchData,
    tense.onPostDataGenerator,
    tense.onPostValid,
    tense.onPostCapture
    // end treatment tense
];
