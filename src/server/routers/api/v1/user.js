const config = require('./../../../../../config').httpSetting;
const router = require('express').Router();
const auth = require('./../../midwares/auth');
const Packing = require('./../../../../utils/packing');

const { getUserInstanceByUsername,
        userNameIsUsed,
        createUser,
        signin,
        createToken,
        destroyToken } = require('./../../functions/user');

router
    .post('/signin', auth(), async (req, res) => {
        const { username, password } = req.body;
        // 验证用户信息 todo 接入 ldap
        if (await signin(username, password)) {
            // todo 在库中查找当前用户 或 创建用户
            // await user.findOrCreate({});
            const userInstance = await getUserInstanceByUsername(username);
            // 生成token
            res.cookie('mockToken', await createToken(userInstance), {
                path: '/mock',
                expires: new Date(Date.now() + config.cookieExpires)
            })
                .status(200)
                .json(Packing({}, 0, 'Authorized', '登录成功'));
        } else {
            res.status(401).json(Packing({}, 401, 'Unauthorized', '认证失败 - 用户名或密码错误'));
        }
    }) // done
    .get('/signout', auth(auth.user), async (req, res) => {
        if (req.cookies.mockToken) {
            const mockToken = req.cookies.mockToken;
            // todo 删除token
            await destroyToken(mockToken);
            res
                .clearCookie()
                .status(200)
                .json(Packing({}, 0, 'Signout', '已安全退出'));
        }
    }) // done
    .get('/check/username', auth(), async (req, res) => {
        const { username } = req.query;
        if (await userNameIsUsed(username)) {
            res
                .status(200)
                .json(Packing({
                    hasUsed: true
                }, 0, 'used username', '该用户名已被使用'));
            return;
        }
        res
            .status(200)
            .json(Packing({
                hasUsed: false
            }, 0, 'fresh username', '该用户名未注册'));
    }) // done
    .post('/signup', auth(), async (req, res) => {
        const { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            res
                .status(409)
                .json(Packing({}, 409, 'conflict password', '密码与确认密码不相同'));
            return;
        }
        if (await userNameIsUsed(username)) {
            res
                .status(200)
                .json(Packing({
                    hasUsed: true
                }, 1, 'used username', '该用户名已被使用'));
            return;
        }

        const userInstance = await createUser(username, password);

        res
            .cookie('mockToken', await createToken(userInstance), {
                path: '/mock',
                expires: new Date(Date.now() + config.cookieExpires)
            })
            .status(201)
            .json(Packing({}, 0, 'Authorized', '注册成功'));
    }) // done
    .patch('/', auth(auth.user), async (req, res) => {
        const { password, confirmPassword, chineseName, apiToken } = req.body;
        const user = req.userInfo;
        if (password) {
            if (password === confirmPassword) {
                user.set({ password });
            } else {
                res
                    .status(409)
                    .json(Packing({}, 409, 'conflict password', '密码与确认密码不相同'));
                return;
            }
        }
        if (chineseName) {
            user.set({ chineseName });
        }
        if (apiToken) {
            user.set({ apiToken });
        }
        user.save();
        const userInfo = user.get({ plain: true });
        delete userInfo.password_hash;
        delete userInfo.password;
        delete userInfo.salt;
        delete userInfo.id;

        res.status(200).json(Packing({ userInfo }));
    })
    .get('/userInfo', auth(auth.user), async (req, res) => {
        // todo 查询用户信息
        const userInfo = req.userInfo.get({ plain: true });

        delete userInfo.password_hash;
        delete userInfo.password;
        delete userInfo.salt;
        delete userInfo.id;

        res
            .status(200)
            .json(Packing({ userInfo }, 0, 'get userInfo', '用户信息'));
    }); // done

module.exports = router;