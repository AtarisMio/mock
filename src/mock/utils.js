const config = require('./../../config').httpSetting;
const models = require('./../modules');
var pathRegexp = require('path-to-regexp');


const getUserInfo = (req, res, next) => {
    const headers = req.headers;
    const userToken = headers[config.userSection] || false; // 从headers内获取特定的用户标识
    if (userToken) {
        models.user.findOne({ where: { userToken } })
            .then(user => {
                if (user) {
                    req.userInfo = user;
                } else {
                    req.shouldCapture = false;
                }
                next();
            });
    } else {
        req.shouldCapture = false;
        next();
    }
};

const getApiRegex = (req, res, next) => {
    const userInfo = req.userInfo;
    if (userInfo) {
        models.api.findAll({ where : { user: userInfo.id } })
            .then(apis => {
                apis.map(api => {
                    const reg = pathRegexp(api.apiPath);
                    const match = reg.exec(url.path);

                })
            })
    } else {
        req.shouldCapture = false;
        next();
    }
};