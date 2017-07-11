const request = require('request');

module.exports = (req, res, next) => {
    const startProxyTime = new Date().valueOf();
    request({
        url: `${req.backend}${req.originalUrl}`,
        headers: Object.assign(
            {},
            req.headers,
            { host: req.backend.replace(/http:\/\/|https:\/\//ig,'') }
        ),
        method: req.method, form: req.body },
        (error, response, body) => {
            const endProxyTime = new Date().valueOf();
            const serverPenddingTime = endProxyTime - startProxyTime;
            try {
                res.locals.data = JSON.parse(body);
            } catch (e) {
                res.locals.data = body.length > 1000 ? body.substr(0, 1000) : body;
            } finally {
                res.locals = Object.assign({}, res.locals, { startProxyTime, endProxyTime, serverPenddingTime });
            }
            next();
        }
    ).pipe(res);
};
