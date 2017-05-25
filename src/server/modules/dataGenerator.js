const Sequelize = require('sequelize');
const sequelize = require('./../utils/orm/index');

const dataGenerator = sequelize.define('dataGenerator', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
    generator: { type: Sequelize.TEXT, allowNull: true, defaultValue: null }
});

module.exports = dataGenerator;
