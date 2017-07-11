
module.exports = (plain) => {
    return require('crypto').createHash('md5').update(plain).digest('hex');
};
