const glob = require('glob');

const modulesName = glob.sync('!(index.js)', {
    cwd: __dirname
})

const modules = {};

modulesName.map(moduleName =>
    modules[moduleName.replace('.js', '')] = require(`./${moduleName}`)
);

function createTables(...tables) {
    for(let table of tables) {
        table.sync({ force: true }); // 会drop掉已有的表 
    }
}

createTables(...Object.values(modules));

module.exports = Object.assign({}, modules, {
    method: {
        createTables
    }
});
