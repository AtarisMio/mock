const { httpSetting } = require('./../../config');
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
        const data = Object.assign({}, req.postDataGenerator.generator);
        require('./gneratorMidware')(data, req.query, req.body, req.userInfo.chineseName || req.userInfo.username);
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
    onPreCapture,
    onPreValid,
    onPreDataGenerator,
    onFetchData,
    onPostDataGenerator,
    onPostValid,
    onPostCapture
};