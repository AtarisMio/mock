const Api = require('./api');
const postValid = require('./postValid');
const preValid = require('./preValid');
const valid = require('./valid');

function createTables(...tables) {
    for(let table of tables) {
        table.sync(); // 不会drop掉已有的表 
    }
}

createTables(Api, preValid, postValid, valid);

module.exports = {
    method: {
        createTables
    },
    Api,
    preValid,
    postValid,
    valid
};
