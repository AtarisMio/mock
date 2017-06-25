module.exports = ({ api, dataGenerator, postValid, preValid, token, user, valid }) => {

    console.debug('begin set association.');
    // api <-> user
    api.owner = api.belongsTo(user, { as: 'owner' }); // api
    user.api = user.hasMany(api, { as: 'api' }); // api

    // token -> user
    token.user = token.belongsTo(user, { as: 'user' }); // token

    // api <-> [pre|post]Valid <-> valid
    api.preValid = api.hasMany(valid, { as: 'preValid' }); // valid
    api.postValid = api.hasMany(valid, { as: 'postValid' }); // valid
    valid.owner = valid.belongsTo(api, { as: 'owner' }); // valid

    // api <-> dataGenerator
    api.preDataGenerator = api.hasOne(dataGenerator, { as: 'preDataGenerator' });  // dataGenerator
    api.postDataGenerator = api.hasOne(dataGenerator, { as: 'postDataGenerator' }); // dataGenerator
    dataGenerator.api = dataGenerator.belongsTo(api, { as: 'api' }); // dataGenerator
    console.debug('has set association.');
};
