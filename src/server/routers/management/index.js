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

router.get('/apis/*', auth(auth.user), (req, res) => {
    const locals = res.locals;
    const path = req.path;

    locals.selection = 'apis';
    locals.title = 'api管理';
    locals.api = {
        selection: path.replace(/\/apis\/(.*?)(\/|\?|#|$)/, '$1')
    }
    res.render('apis');
});

router.get('/signup', (req, res) => {
    const locals = res.locals;
    locals.selection = 'signup';
    locals.title = '登录';

    res.render('signin');
}).get('/signin', (req, res) => {
    const locals = res.locals;
    locals.selection = 'signin';
    locals.title = '登录';

    res.render('signin');
}).get('/signout', async (req, res) => {
    const { destroyToken } = require('./../functions/user');
    await destroyToken(req.mockToken);
    res.clearCookie('mockToken', { path: '/mock' }).redirect('/mock/management');
});

module.exports = router;