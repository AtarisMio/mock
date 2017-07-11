module.exports = (sequelize, DataTypes) =>
    sequelize.define('api', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        apiPath: DataTypes.STRING,
        method: DataTypes.STRING,
        // owner: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: 'user',
        //         key: 'id'
        //     }
        // },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        author: DataTypes.STRING,
        // preDataGenerator: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: 'dataGenerator',
        //         key: 'id'
        //     }
        // },
        // postDataGenerator: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: 'dataGenerator',
        //         key: 'id'
        //     }
        // }
    });
