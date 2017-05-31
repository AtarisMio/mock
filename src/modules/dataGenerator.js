module.exports = (sequelize, DataTypes) =>
    sequelize.define('dataGenerator', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        generator: { type: DataTypes.TEXT, allowNull: true, defaultValue: null }
    });
