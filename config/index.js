const glob = require('glob');

const Environments = {
    'd': 'development',
    'dev': 'development',
    'development': 'development',
    'p': 'production',
    'pro': 'production',
    'prod': 'production',
    'production': 'production'
}

const env = process.env.NODE_ENV && (process.env.NODE_ENV.toLowerCase() in Environments) && Environments[process.env.NODE_ENV] || 'development';

const configs = {}

glob.sync('!(index.js|example.js)', {
    cwd: 'config'
}).map(config => {
    configs[config.replace('.js', '')] = require(`./${config}`)[env]
});


module.exports = configs;