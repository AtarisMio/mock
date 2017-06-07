const router    = require('express').Router();
const glob      = require('glob');

const routers = glob.sync('*/**/*\.js', {
    cwd: __dirname
});

routers.map(route => route.replace(/\/index\.js|\.js$/, '')).map(route =>
    router.use(`/${route}`, require(`./${route}`))
);

module.exports = router;
