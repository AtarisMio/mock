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
                    req.shouldCapture = true;
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
    const url = req.url;
    if (userInfo) {
        models.api.findAll({ where: { user: userInfo.id } })
            .then(apis => {
                return apis.filter(api => {
                    const reg = pathRegexp(api.apiPath);
                    const match = reg.exec(url.path);
                    return !!match;
                });
            }).then(apis => {
                if(apis.length !== 0) {
                    req.apis = Object.freeze(apis);
                    req.shouldCapture = true;
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

const getPreValid = (req, res, next) => {
    const apis = req.apis;
    if (apis && apis.length !== 0) {
        apis.map(api => {
            models.preValid.findAll({ where: { api: api.id } })
                .then(preValids => {
                    if(preValids.length !== 0) {
                        req.preValids = Object.freeze(preValids);
                        req.shouldPreValid = true;
                    } else {
                        req.shouldPreValid = false;
                    }
                    next();
                });
        });
    } else {
        req.shouldPreValid = false;
        next();
    }
};

const getPostValid = (req, res, next) => {
    const apis = req.apis;
    if (apis && apis.length !== 0) {
        apis.map(api => {
            models.postValid.findAll({ where: { api: api.id } })
                .then(postValids => {
                    if(postValids.length !== 0) {
                        req.postValids = Object.freeze(postValids);
                        req.shouldPostValid = true;
                    } else {
                        req.shouldPostValid = false;
                    }
                    next();
                });
        });
    } else {
        req.shouldPostValid = false;
        next();
    }
};

