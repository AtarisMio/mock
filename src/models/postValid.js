module.exports = (sequelize, DataTypes) =>
    sequelize.define('postValid', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        // api: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: 'api',
        //         key: 'id'
        //     }
        // }
    });
