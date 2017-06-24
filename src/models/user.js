const md5 = require('./../utils/md5');
const config = require('./../../config').mysql;
module.exports = (sequelize, DataTypes) =>
    sequelize.define('user', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        username: { type: DataTypes.STRING, unique: true },
        password_hash: DataTypes.STRING,
        password: {
            type: DataTypes.VIRTUAL,
            set: function(val) {
                this.setDataValue('password', val);
                this.setDataValue('password_hash', md5(config.salt + val));
            },
            validate: {
                isLongEnough: function (val) {
                    if (val.length < 4) {
                        throw new Error('Please choose a longer password');
                    }
                }
            }
        },
        chineseName: DataTypes.STRING,
        apiToken: { type: DataTypes.STRING, unique: true }
    }, {
        indexes: [
            {
                method: 'HASH',
                fields: ['apiToken']
            }
        ]
    });
