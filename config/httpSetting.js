const development = {
    /**
     * 可以设定为输入string、{ prefix: string, url: string }、array({ prefix: string, url: string })三种形式
     * 输入string则相当于所有请求都代理到当前的服务器
     * 输入object则只代理当前符合prefix的请求，其余直接进入next
     * 输入array的时候则匹配到第一个满足prefix的地址，如都不能匹配则进入next
     */
    backendServers: 'https://m.gomemyc.com',
    userSection: 'userInfo'
    // 写入开发配置
};

const prodution = {
    // 写入生产配置
};

module.exports = {
    development,
    prodution
};
