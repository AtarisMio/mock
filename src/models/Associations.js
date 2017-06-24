module.exports = ({ api, dataGenerator, postValid, preValid, token, user, valid }) => {

    console.trace('begin set association.');
    // api <-> user
    api.owner = api.belongsTo(user, { as: 'owner' }); // api
    user.api = user.hasMany(api, { as: 'api' }); // api

    // token -> user
    token.user = token.belongsTo(user, { as: 'user' }); // token

    // api <-> preValid <-> valid
    api.preValid = api.hasMany(preValid, { as: 'preValid' }); // preValid
    preValid.owner = preValid.belongsTo(api, { as: 'owner' }); // preValid
    preValid.instance = preValid.hasOne(valid, { as: 'instance' }); // valid
    valid.preValid = valid.belongsTo(preValid); // valid
    // api <-> postValid <-> valid
    api.postValid = api.hasMany(postValid, { as: 'postValid' }); // postValid
    postValid.owner = postValid.belongsTo(api, { as: 'owner' }); // postValid
    postValid.instance = postValid.hasOne(valid, { as: 'instance' }); // valid
    valid.postValid = valid.belongsTo(postValid); // valid

    // api <-> dataGenerator
    api.preDataGenerator = api.hasOne(dataGenerator, { as: 'preDataGenerator' });  // dataGenerator
    api.postDataGenerator = api.hasOne(dataGenerator, { as: 'postDataGenerator' }); // dataGenerator
    dataGenerator.api = dataGenerator.belongsTo(api, { as: 'api' }); // dataGenerator
    console.trace('has set association.');
};
