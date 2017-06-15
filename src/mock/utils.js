const config = require('./../../config').httpSetting;
const models = require('./../models').models;
const pathRegexp = require('path-to-regexp');

const backendServers = {};
if (typeof config.backendServers === 'string'){
    backendServers['/*'] = config.backendServers;
} else if ('prefix' in config.backendServers && 'url' in config.backendServers) {
    backendServers[config.backendServers.prefix] = config.backendServers.url;
} else if (config.backendServers instanceof Array) {
    config.backendServers
        .filter(server => 'prefix' in server && 'url' in server)
        .map(server => {
            backendServers[server.prefix] = server.url;
        });
}

const getUserInfo = (req, res, next) => {
    const headers = req.headers;
    const cookies = req.cookies;
    const userToken = headers[config.userSection] || cookies[config.userSection] || false; // 从headers内获取特定的用户标识
    if (userToken) {
        models.user.findOne({ where: { userToken } })
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
    const url = req.originalUrl;
    const method = req.method;
    if (userInfo) {
        models.api.findAll({ where: { user: userInfo.id } })
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
                if(apis.length !== 0) {
                    req.api = Object.seal(apis[0]);
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
    const api_id = req.api && req.api.id;
    if (api_id) {
        models.preValid.findOne({ where: { api: api_id } })
            .then(preValid => {
                if (preValid) {
                    req.preValid = Object.seal(preValid);
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
    const api_id = req.api && req.api.id;
    if (api_id) {
        models.postValid.findAll({ where: { api: api_id } })
            .then(postValid => {
                if(postValid) {
                    req.postValid = Object.seal(postValid);
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
    const api_preDG = req.api && req.api.preDataGenerator;
    if (api_preDG) {
        models.dataGenerator.findOne({where: { id: api_preDG }})
            .then(preDataGenerator => {
                if(preDataGenerator) {
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
}

const getPostDataGenerator = (req, res, next) => {
    const api_postDG = req.api && req.api.PostDataGenerator;
    if (api_postDG) {
        models.dataGenerator.findOne({where: { id: api_postDG }})
            .then(postDataGenerator => {
                if(postDataGenerator) {
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
}

const onCapture = (req, res, next) => {
    if (req.shouldCapture) {
        console.trace(req.url, req.headers, req.body, req.userInfo);
    }
    next();
    if (req.shouldCapture) {
        console.trace(res.headers, res.body);
    }
}

const onValid = (req, res, next) => {
    // todo valid req
    next();
    // todo valid res
}

const onDataGenerator = (req, res, next) => {
    // todo generate req data
    next();
    // res.json({user: 1233});
}

const onFetchData = (req, res, next) => {
    for(let prefix in backendServers) {
        const reg = pathRegexp(prefix);
        const match = !!reg.exec(req.url);
        if (match) {
            req.backend = backendServers[prefix];
            break;
        }
    }
    next();
}

const proxy = require('./proxy');

module.exports = {
    getUserInfo,
    getApiRegex,
    getPreValid,
    getPostValid,
    getPreDataGenerator,
    getPostDataGenerator,
    onCapture,
    onValid,
    onDataGenerator,
    onFetchData,
    proxy
};
