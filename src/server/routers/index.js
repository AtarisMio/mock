const router = require('express').Router();
const glob = require('glob');

const routers = glob.sync('*', {
    cwd: 'src/server/routers'
});

routers.filter(r => r.indexOf('.') === -1).map(route => 
    router.use(`/${route}`, require(`./${route}`))
);

module.exports = router;
