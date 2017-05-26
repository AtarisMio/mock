module.exports = (sequelize, DataTypes) =>
    sequelize.define('api', {
        apiPath: { type: DataTypes.STRING, primaryKey: true },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        author: DataTypes.STRING,
        dataGenerator: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'dataGenerator',
                key: 'id'
            }
        }
    });
