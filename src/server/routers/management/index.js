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

router.get('/apis(/*|)', auth(auth.user), async (req, res) => {
    const locals = res.locals;
    const path = req.path;

    locals.selection = 'apis';
    locals.title = 'api管理';
    locals.api = {
        selection: path.replace(/\/apis(\/|$)(.*?)(\/|\?|#|$)/, '$2') || 'dashboard'
    };
    if (locals.api.selection === 'mockdata') {
        locals.api.apisList = await req.userInfo.getApi().map(async instance => {
            instance.owner = await instance.getOwner();
            instance.preValid = await instance.getPreValid();
            instance.postValid = await instance.getPostValid();
            instance.preDataGenerator = await instance.getPreDataGenerator();
            instance.postDataGenerator = await instance.getPostDataGenerator();
            return instance;
        });
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