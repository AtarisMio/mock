const config = require('./../../../../../config').httpSetting;
const router = require('express').Router();
const { user, api } = require('./../../../../models').models;
const Promise = require('bluebird');
const auth = require('./../../midwares/auth');
const Packing = require('./../../../../utils/packing');

router
    .post('/signin', auth(), async (req, res) => {
        const { username, password } = req.body;
        // todo 验证用户信息

        const authed = true;
        // 根据认证结果
        if (authed) {
            // todo 在库中查找当前用户 或 创建用户
            // await user.findOrCreate({});
            // todo 生成token

            const token = 'asd12e';
            res.cookie('mockToken', token, {
                path: '/mock',
                expires: new Date(Date.now() + config.cookieExpires)
            })
            .status(200)
            .json(Packing({}, 0, 'Authorized', '登录成功'));
        } else {
            res.status(401).json(Packing({}, 401, 'Unauthorized', '认证失败 - 用户名或密码错误'));
        }
    })
    .get('/signout', auth(), async (req, res) => {
        if (req.cookies.mockToken) {
            const token = req.cookies.mockToken;
            // todo 删除token

            res
            .clearCookie()
            .status(200)
            .json(Packing({}, 0, 'Signout', '已安全退出'));
        }
    })
    .post('/set/:type', auth(auth.user), async (req, res) => {
        switch (req.params.type) {
            case 'name':
                // todo 设置用户中文名
                break;
        
            default:
                break;
        }
        res.send(200);
    })
    .get('/userInfo', auth(auth.user), async (req, res) => {
        // todo 查询用户信息
        res.send(200);
    });

// router.get('/', auth(auth.user), (req, res) => {
//     debugger;
//     // currentuser = null;
//     user.create({
//         userName: 'aaa',
//         chineseName: '徐航',
//         apiToken: 'soskdkdo'
//     }).then(user => {
//         debugger;
//         console.log(user.get({ plain: true }));
//         Promise.resolve();
//         return user.get({ plain: true });
//         // res.send(user.get({ plain: true }));
//     }).then(user => {
//         debugger;
//         return api.create({
//             apiPath: '^/api/v1/user',
//             method: 'GET',
//             user: user.id,
//             title: '用户信息',
//             description: '这是查询用户信息的接口',
//             author: '徐航',
//             preDataGenerator: null,
//             postDataGenerator: null
//         });
//     }).then(api => {
//         debugger;
//         console.log(api.get({ plain: true }));
//         res.send(api.get({ plain: true }));
//     }).catch(e => {
//         debugger;
//         console.log(e);
//     })
// });

module.exports = router;