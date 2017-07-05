const router = require('express').Router();

router.get('/', (req, res) => {
    const locals = res.locals;
    locals.selection = 'home';

    res.render('home');
});

router.get('/docs', (req, res) => {
    const locals = res.locals;
    locals.selection = 'docs';
    locals.title = '使用文档';

    res.render('docs');
});

router.get('/signin', (req, res) => {
    const locals = res.locals;
    locals.selection = 'signin';
    locals.title = '登录';

    res.render('signin');
});

module.exports = router;