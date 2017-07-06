const router = require('express').Router();
const auth = require('./../midwares/auth');


router.get('/', auth(), (req, res) => {
    const locals = res.locals;
    locals.selection = 'home';

    res.render('home');
});

router.get('/docs', auth(), (req, res) => {
    const locals = res.locals;
    locals.selection = 'docs';
    locals.title = '使用文档';

    res.render('docs');
});

router.get('/apis', auth(auth.user), (req, res) => {
    const locals = res.locals;
    locals.selection = 'docs';
    locals.title = '使用文档';

    res.render('docs');
});

router.get('/signup', (req, res) => {
    const locals = res.locals;
    locals.selection = 'signup';
    locals.title = '登录';

    res.render('signin');
});

router.get('/signin', (req, res) => {
    const locals = res.locals;
    locals.selection = 'signin';
    locals.title = '登录';

    res.render('signin');
});

module.exports = router;