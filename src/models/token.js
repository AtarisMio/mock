module.exports = (sequelize, DataTypes) =>
    sequelize.define('user', {
        id: { type: DataTypes.UUIDV4, autoIncrement: true, primaryKey: true, unique: true },
        generateTime: DataTypes.NOW,
        user: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        indexes: [
            {
                method: 'HASH',
                fields: ['id']
            }
        ]
    });
