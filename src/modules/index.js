const glob      = require('glob');
const path      = require('path');
const basename  = path.basename(module.filename);
const { Sequelize, sequelize } = require('./utils/orm/index');

const modelsName = glob.sync(`!(${basename})`, {
    cwd: __dirname
});

const models = {};

modelsName.map(modelName => {
    let model = sequelize.import(path.join(__dirname, `./${modelName}`));
    models[model.name] = model;
});

for(let modelName in models) {
    if('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
}

function createTables(...tables) {
    for(let table of tables) {
        table.sync({ force: true });
    }
}

module.exports = Object.assign({}, models, {
    method: {
        Sequelize,
        createTables
    }
});
