const glob      = require('glob');
const path      = require('path');
const basename  = path.basename(module.filename);

const Environments = {
    'd': 'development',
    'dev': 'development',
    'development': 'development',
    'p': 'production',
    'pro': 'production',
    'prod': 'production',
    'production': 'production'
};

const env = process.env.NODE_ENV && (process.env.NODE_ENV.toLowerCase() in Environments) && Environments[process.env.NODE_ENV] || 'development';

const configs = {
    env,
    Storage: 'mysql'
};

glob.sync(`!(${basename}|example.js)`, {
    cwd: __dirname
}).map(config =>
    configs[config.replace('.js', '')] = require(`./${config}`)[env]
);


module.exports = configs;