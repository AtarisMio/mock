const Sequelize = require('sequelize');
const sequelize = require('./../utils/orm/index');
const preValid = require('./preValid');
const postValid = require('./postValid');

const valid = sequelize.define('valid', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
    action: Sequelize.TEXT,
    preValid: {
        type: Sequelize.INTEGER,
        reference: {
            model: preValid,
            key: 'id'
        }
    },
    postValid: {
        type: Sequelize.INTEGER,
        reference: {
            model: postValid,
            key: 'id'
        }
    }
});

module.exports = valid;
