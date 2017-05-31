module.exports = (sequelize, DataTypes) =>
    sequelize.define('user', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        userName: DataTypes.STRING,
        chineseName: DataTypes.STRING,
        userToken: { type: DataTypes.STRING, unique: true }
    }, {
        indexes: [
            {
                method: 'HASH',
                fields: ['userToken']
            }
        ]
    });
