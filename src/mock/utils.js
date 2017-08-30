const { httpSetting, env } = require('./../../config');
const models = require('./../models').models;
const pathRegexp = require('path-to-regexp');

const getUserInfo = (req, res, next) => {
    const headers = req.headers;
    const cookies = req.cookies;
    const apiToken = headers[httpSetting.userSection] || cookies[httpSetting.userSection] || false; // 从headers内获取特定的用户标识
    if (apiToken) {
        models.user.findOne({ where: { apiToken } })
            .then(user => {
                if (user) {
                    req.userInfo = Object.seal(user);
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
    const url = req.baseUrl + req.path;
    const method = req.method;
    if (userInfo) {
        userInfo.getApi()
            .then(apis => {
                return apis.filter(api => {
                    if (api.method.toUpperCase() !== 'ALL' && api.method.toUpperCase() !== method) {
                        return false;
                    }
                    const reg = pathRegexp(api.apiPath);
                    const match = reg.exec(url);
                    return !!match;
                });
            }).then(apis => {
                if (apis.length !== 0) {
                    req.api = Object.seal(apis[0]);
                    req.shouldCapture = env === 'debug' || true;
                } else {
                    req.shouldCapture = env === 'debug' || false;
                }
                next();
            });
    } else {
        req.shouldCapture = env === 'debug' || false;
        next();
    }
};

const getPreValid = (req, res, next) => {
    const api = req.api;
    if (api) {
        api.getPreValid()
            .then(preValids => {
                if (preValids && preValids.length > 0) {
                    req.preValids = Object.seal(preValids);
                    req.shouldPreValid = true;
                } else {
                    req.shouldPreValid = false;
                }
                next();
            });
    } else {
        req.shouldPreValid = false;
        next();
    }
};

const getPostValid = (req, res, next) => {
    const api = req.api;
    if (api) {
        api.getPostValid()
            .then(postValids => {
                if (postValids && postValids.length > 0) {
                    req.postValids = Object.seal(postValids);
                    req.shouldPostValid = true;
                } else {
                    req.shouldPostValid = false;
                }
                next();
            });
    } else {
        req.shouldPostValid = false;
        next();
    }
};

const getPreDataGenerator = (req, res, next) => {
    const api = req.api;
    if (api) {
        api.getPreDataGenerator()
            .then(preDataGenerator => {
                if (preDataGenerator) {
                    req.preDataGenerator = Object.seal(preDataGenerator);
                    req.shouldPreGenerate = true;
                } else {
                    req.shouldPreGenerate = false;
                }
                next();
            });
    } else {
        req.shouldPreGenerate = false;
        next();
    }
};

const getPostDataGenerator = (req, res, next) => {
    const api = req.api;
    if (api) {
        api.getPostDataGenerator()
            .then(postDataGenerator => {
                if (postDataGenerator) {
                    req.postDataGenerator = Object.seal(postDataGenerator);
                    req.shouldPostGenerate = true;
                } else {
                    req.shouldPostGenerate = false;
                }
                next();
            });
    } else {
        req.shouldPostGenerate = false;
        next();
    }
};

module.exports = {
    getUserInfo,
    getApiRegex,
    getPreValid,
    getPostValid,
    getPreDataGenerator,
    getPostDataGenerator
};
