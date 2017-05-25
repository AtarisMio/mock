const Sequelize = require('sequelize');
const sequelize = require('./../utils/orm/index');
const dataGenerator = require('./dataGenerator');

const Api = sequelize.define('api', {
    apiPath: { type: Sequelize.STRING, primaryKey: true },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    author: Sequelize.STRING,
    dataGenerator: {
        type: Sequelize.INTEGER,
        reference: {
            model: dataGenerator,
            key: 'id'
        }
    }
});

module.exports = Api;
