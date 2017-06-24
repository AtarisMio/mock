const Packing = require('./../../../utils/packing');
const { getUserInstanceByToken } = require('./../functions/user');

const auth = (type = auth.anonymous) => {
    if (type === auth.anonymous) {
        return async (req, res, next) => {
            await next();
        };
    }
    if (type === auth.user) {
        return async (req, res, next) => {
            const mockToken = req.cookies.mockToken;
            if (!mockToken) {
                // todo 页面应当重定向

                // api返回401
                res.status(401).json(Packing({}, 401, 'Unauthorized', '用户未登录'));
            }
            let user;
            try {
                user = await getUserInstanceByToken(mockToken);
            } catch (e) {
                if(e.type === 'tokenExpired') {
                    // todo 页面应当重定向

                    // api返回401
                    res.status(401).json(Packing({}, 401, 'Unauthorized', '用户未登录'));
                    return;
                }
            }
            req.userInfo = user;
            // 在req上挂user信息
            await next();
        };
    }
    if (type === auth.admin) {
        return async (req, res, next) => {
            // todo 管理员验证
            await next();
        };
    }
};

auth.anonymous = 'AUTH__anonymous';
auth.user = 'AUTH__user';
auth.admin = 'AUTH__admin';

module.exports = auth;