const { api, dataGenerator, valid } = require('./../../../models').models;

const addApi = async (user, { apiPath, method, title, description, author }) => {
    const apiInstance = await api.create({ apiPath, method, title, description, author: author || user.chineseName });
    apiInstance.setOwner(user);
    user.addApi(apiInstance);
    return apiInstance;
}

const removeApi = async (user, apiInstance) => {
    // todo 删除所有相关valid datagenerator
    await user.removeApi(apiInstance);
    apiInstance.destroy();
}

const getDataGenerator = async (api, isPre = true) => await api[`get${isPre ? 'Pre' : 'Post'}DataGenerator`]();
const hasDataGenerator = async (api, isPre = true) => !!await getDataGenerator(api, isPre);
const setDataGenerator = async (api, dataGeneratorInstance, isPre = true) => api[`set${isPre ? 'Pre' : 'Post'}DataGenerator`](dataGeneratorInstance);
const removeDataGenerator = async (api, isPre = true) => {
    const dataGeneratorInstance = await getDataGenerator(api, isPre);
    setDataGenerator(api, undefined, isPre);
    dataGeneratorInstance.destroy();
}

const setDataGeneratorToApi = async (api, generator, isPre = true) => {
    const dataGeneratorInstance = await dataGenerator.create({ generator });
    dataGeneratorInstance.setApi(api);
    return await setDataGenerator(api, dataGeneratorInstance);
};

const getValid = async (api, isPre = true) => await api[`get${isPre ? 'Pre' : 'Post'}Valid`]();
const addValidToApi = async (api, action, isPre = true) => {
    const validInstance = await valid.create({ action });
    validInstance.setOwner(api);
    api[`add${isPre ? 'Pre' : 'Post'}Valid`](validInstance);
}
const removeValid = async (validInstance) => {
    const api = await validInstance.getOwner();
    await api.removePreValid(validInstance);
    await api.removePostValid(validInstance);
    validInstance.destroy();
}

module.exports = {
    addApi,
    removeApi,
    getDataGenerator,
    hasDataGenerator,
    setDataGenerator,
    setDataGeneratorToApi,
    removeDataGenerator,
    getValid,
    addValidToApi,
    removeValid
}