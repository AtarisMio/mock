const { httpSetting, env } = require('./../../config');
const models = require('./../models').models;
const pathRegexp = require('path-to-regexp');

const backendServers = {};
if (typeof httpSetting.backendServers === 'string') {
    backendServers['/*'] = httpSetting.backendServers;
} else if ('prefix' in httpSetting.backendServers && 'url' in httpSetting.backendServers) {
    backendServers[httpSetting.backendServers.prefix] = httpSetting.backendServers.url;
} else if (httpSetting.backendServers instanceof Array) {
    httpSetting.backendServers
        .filter(server => 'prefix' in server && 'url' in server)
        .map(server => {
            backendServers[server.prefix] = server.url;
        });
}

const getUserInfo = (req, res, next) => {
    const headers = req.headers;
    const cookies = req.cookies;
    const userToken = headers[httpSetting.userSection] || cookies[httpSetting.userSection] || false; // 从headers内获取特定的用户标识
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
                if (postValid) {
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
        models.dataGenerator.findOne({ where: { id: api_preDG } })
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
    const api_postDG = req.api && req.api.PostDataGenerator;
    if (api_postDG) {
        models.dataGenerator.findOne({ where: { id: api_postDG } })
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

const onPreCapture = (req, res, next) => {
    if (req.shouldCapture) {
        console.trace('PreCapture', req.url, req.headers, req.body, req.userInfo);
    }
    next();
};

const onPostCapture = (req, res, next) => {
    if (req.shouldCapture) {
        console.trace('PostCapture', req.url, req.headers, req.body, req.userInfo, res._headers, res.locals);
    }
    next();
};

const onPreValid = (req, res, next) => {
    if (req.shouldPreValid) {
        // todo valid req
    }
    next();
};

const onPostValid = (req, res, next) => {
    if (req.shouldPostValid) {
        // todo valid res
    }
    next();
};

const onPreDataGenerator = (req, res, next) => {
    if (req.shouldPreGenerate) {
        // todo generate req data
    }
    next();
};

const onPostDataGenerator = (req, res, next) => {
    if (req.shouldPostGenerate) {
        // todo generate res data
        const data = { aaa:123 };
        res.locals.data = data;
        res.json(data);
    }
    next();
};


const onFetchData = (req, res, next) => {
    if (req.shouldPostGenerate) {
        return next();
    }
    for (let prefix in backendServers) {
        const reg = pathRegexp(prefix);
        const match = !!reg.exec(req.url);
        if (match) {
            req.backend = backendServers[prefix];
            require('./proxy')(req, res, next);
            break;
        }
    }
};

module.exports = {
    getUserInfo,
    getApiRegex,
    getPreValid,
    getPostValid,
    getPreDataGenerator,
    getPostDataGenerator,
    onPreCapture,
    onPreValid,
    onPreDataGenerator,
    onFetchData,
    onPostDataGenerator,
    onPostValid,
    onPostCapture
};
