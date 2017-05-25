const Sequelize = require('sequelize');
const sequelize = require('./../utils/orm/index');

const api = sequelize.define('api', {
    apiPath: { type: Sequelize.STRING, primaryKey: true },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    preValid: {
        type: Sequelize.INTEGER,
        reference: {
            model: XXX,
            key: 'id'
        }
    },
    
    postValid: {

    }
});

module.exports = api;
