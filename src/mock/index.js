const utils = require('./utils');

module.exports = [utils.getUserInfo, utils.getApiRegex, utils.getPreValid, utils.getPostValid, // 预处理mock需要的规则
    (req, res, next) => {
        // 真正处理mock逻辑
        
    }];