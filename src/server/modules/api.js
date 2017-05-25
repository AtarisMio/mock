const Sequelize = require('sequelize');
const sequelize = require('./../utils/orm/index');

const Api = sequelize.define('api', {
    apiPath: { type: Sequelize.STRING, primaryKey: true },
    title: Sequelize.STRING,
    description: Sequelize.STRING
});

module.exports = Api;
