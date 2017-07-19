module.exports = (sequelize, DataTypes) => {
    const Api = sequelize.define('api', {
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

    Api.associate = ({ user, valid, dataGenerator }) => {
        Api.owner = Api.belongsTo(user, { as: 'owner' }); // api
        Api.preValid = Api.hasMany(valid, { as: 'preValid' }); // valid
        Api.postValid = Api.hasMany(valid, { as: 'postValid' }); // valid
        Api.preDataGenerator = Api.hasOne(dataGenerator, { as: 'preDataGenerator', foreignKey: 'preDataGenerator' });  // dataGenerator
        Api.postDataGenerator = Api.hasOne(dataGenerator, { as: 'postDataGenerator', foreignKey: 'postDataGenerator' }); // dataGenerator
    };

    return Api;
};
