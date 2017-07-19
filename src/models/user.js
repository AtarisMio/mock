const md5 = require('./../utils/md5');
const config = require('./../../config').mysql;
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        username: { type: DataTypes.STRING, unique: true },
        password_hash: DataTypes.STRING,
        password: {
            type: new DataTypes.VIRTUAL(DataTypes.STRING, ['salt', 'password_hash']),
            get: function() {
                return this.get('password_hash');
            },
            set: function(val) {
                this.setDataValue('password', val);
                this.setDataValue('password_hash', md5(this.get('salt') + val));
            },
            validate: {
                isLongEnough (val) {
                    if (val.length < 4) {
                        throw new Error('Please choose a longer password');
                    }
                }
            }
        },
        salt: {
            type: new DataTypes.VIRTUAL(DataTypes.STRING, ['username', 'createdAt']),
            get: function() {
                return config.salt + this.get('username');
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

    User.associate = ({ api }) => {
        User.api = User.hasMany(api, { as: 'api' }); // api
    };

    return User;
};
