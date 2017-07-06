const router = require('express').Router();
const glob = require('glob');

const routers = glob.sync('*/**/*\.js', {
    cwd: __dirname
});

routers.filter(route => !route.includes('functions/')).map(route => route.replace(/\/index\.js|\.js$/, '')).map(route =>
    router.use(`/${route}`, require(`./${route}`))
);

router.use((req, res, next) => {
    const locals = res.locals;
    locals.error = {
        code: 404,
        message: '您查找的页面走失了，换个页面看看吧！'
    }
    res.status(404).render('error');
}).use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        error: {
            code: 500,
            message: '很不凑巧，这发生了一个错误'
        }
    });
})

module.exports = router;
