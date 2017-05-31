const Sequelize = require('sequelize');
const mysql = require('./mysql');

module.exports = {
    Sequelize,
    sequelize: mysql
};