module.exports = (sequelize, DataTypes) =>
    sequelize.define('valid', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        action: DataTypes.TEXT,
        preValid: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'preValid',
                key: 'id'
            }
        },
        postValid: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'postValid',
                key: 'id'
            }
        }
    });
