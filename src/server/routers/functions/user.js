const { user, token } = require('./../../../models').models;
const randomGenerator = require('./../../../utils/randomGenerator');
const random = new randomGenerator().setBoundary(0, 0xffffffff);

const md5 = require('./../../../utils/md5');

const getUserInstanceByUsername = async (username) => {
    return await user.findOne({ where: { username } });
};

const userNameIsUsed = async (username) => {
    return !!await getUserInstanceByUsername(username);
};

const signin = async (username, password) => {
    const userInstance = await user.findOne({ where: { username } });
    if (userInstance) {
        if(userInstance.password === md5(userInstance.salt + password)) {
            return true;
        }
    }
    return false;
};

const createUser = async (username, password) => {
    return await user.create({
        username,
        password,
        apiToken: md5(random.next() + '')
    });
};

const createToken = async (userInstance) => {
    const tokenInstance = await token.create();
    await tokenInstance.setUser(userInstance);
    return tokenInstance.id;
};

const getUserInstanceByToken = async (mockToken) => {
    const tokenInstance = await token.findById(mockToken);
    if (!tokenInstance || !tokenInstance.valid) {
        destroyToken(mockToken);
        const e = new Error('token has Expired!');
        e.type = 'tokenExpired';
        throw e;
    }
    return await tokenInstance.getUser();
};

const destroyToken = async (mockToken) => {
    return await token.destroy({ where: { id: mockToken } });
};

module.exports = {
    getUserInstanceByUsername,
    userNameIsUsed,
    createUser,
    signin,
    createToken,
    getUserInstanceByToken,
    destroyToken
};