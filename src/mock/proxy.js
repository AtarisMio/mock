const request = require('request');

module.exports = (req, res, next) => {
    res.locals = req.pipe(request(`${req.backend}${req.originalUrl}`)).pipe(res);
};
