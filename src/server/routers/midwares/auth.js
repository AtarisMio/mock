const Packing = require('./../../../utils/packing');

const auth = (type = auth.anonymous) => {
    if (type === auth.anonymous) {
        return async (req, res, next) => {
            await next();
        };
    }
    if (type === auth.user) {
        return async (req, res, next) => {
            // todo 数据库中能从用户中查找到
            if (req.cookies.mockToken && true) {
                await next();
            } else {
                // todo 页面应当重定向

                // api返回401
                res.status(401).json(Packing({}, 401, 'Unauthorized', '用户未登录'));
            }
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