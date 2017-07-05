const development = {
    copyright: `Copyright &copy;2017-${new Date().getFullYear()} <a href="http://www.watchit.net.cn">Ataris</a> 技术提供`,
    recordcode: null,
    navLinks: {
        home: {
            href: '/mock/management',
            label: '首页'
        },
        docs: {
            href: '/mock/management/docs',
            label: '使用文档'
        },
        apis: {
            href: '/mock/management/apis',
            label: 'api管理'
        }
    }
};

const prodution = {
    // 写入生产配置
    copyright: `Copyright &copy;2017-${new Date().getFullYear()} <a href="http://www.watchit.net.cn">Ataris</a> 技术提供`,
    recordcode: null,
};

module.exports = {
    development,
    prodution
};
