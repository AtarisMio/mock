const { getUserInstanceByToken } = require('./../functions/user');

const user = async (req, res, next) => {
    const mockToken = req.cookies.mockToken;
    if (!mockToken) {
        await next();
        return;
    }
    let user;
    try {
        user = await getUserInstanceByToken(mockToken);
    } catch (e) {
        await next();
        return;
    }
    req.userInfo = user;// 在req上挂user信息
    req.mockToken = mockToken;
    res.locals.user = user;
    await next();
};

module.exports = user;