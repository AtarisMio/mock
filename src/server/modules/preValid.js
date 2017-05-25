const Sequelize = require('sequelize');
const sequelize = require('./../utils/orm/index');
const Api = require('./api');

const preValid = sequelize.define('preValid', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
    api: {
        type: Sequelize.INTEGER,
        reference: {
            model: Api,
            key: 'apiPath'
        }
    }
});

module.exports = preValid;
