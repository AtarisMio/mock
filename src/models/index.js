const glob      = require('glob');
const path      = require('path');
const basename  = path.basename(module.filename);
const { Sequelize, sequelize } = require('../utils/orm/index');

const modelsName = glob.sync(`!(${basename}|Associations\.js)`, {
    cwd: __dirname
});

const models = {};

modelsName.map(modelName => {
    let model = sequelize.import(path.join(__dirname, `./${modelName}`));
    models[model.name] = model;
});
require('./Associations')(models);

for(let modelName in models) {
    if('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
}

async function resync(...tables) {
    await __resync(false, ...tables);
}

async function createTables(...tables) {
    await __resync(true, ...tables);
}

async function __resync(force, ...tables) {
    for(let table of tables) {
        await table.sync({ force });
    }
}

module.exports = Object.assign({}, {
    methods: {
        Sequelize,
        resync,
        createTables
    },
    models
});
