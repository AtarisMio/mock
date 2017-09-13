const { api, dataGenerator, valid } = require('./../../../models').models;

const addApi = async (user, { apiPath, method, title, description, author }) => {
    const hasSameApi = await user.getApi({ where: { apiPath } });
    if (hasSameApi && hasSameApi.length !== 0) {
        return null;
    }
    const apiInstance = await api.create({ apiPath, method, title, description, author: author || user.chineseName });
    await apiInstance.setOwner(user);
    await user.addApi(apiInstance);
    return apiInstance;
};

const removeApi = async (user, apiInstance) => {
    // todo 删除所有相关valid datagenerator
    removeDataGenerator(apiInstance);
    removeDataGenerator(apiInstance, false);

    await (await getValid(apiInstance)).map(removeValid);
    await (await getValid(apiInstance, false)).map(removeValid);

    await user.removeApi(apiInstance);
    apiInstance.destroy();
};

const getDataGenerator = async (api, isPre = true) => await api[`get${isPre ? 'Pre' : 'Post'}DataGenerator`]();
const hasDataGenerator = async (api, isPre = true) => !!await getDataGenerator(api, isPre);
const setDataGenerator = async (api, dataGeneratorInstance, isPre = true) => api[`set${isPre ? 'Pre' : 'Post'}DataGenerator`](dataGeneratorInstance);
const removeDataGenerator = async (api, isPre = true) => {
    const dataGeneratorInstance = await getDataGenerator(api, isPre);
    setDataGenerator(api, undefined, isPre);
    if (dataGeneratorInstance) {
        dataGeneratorInstance.destroy();
    }
};

const setDataGeneratorToApi = async (api, generator, isPre = true) => {
    if (await hasDataGenerator(api, isPre)) {
        const dataGeneratorInstance = await getDataGenerator(api, isPre);
        return await dataGeneratorInstance.update({ generator });
    } else {
        const dataGeneratorInstance = await dataGenerator.create({ generator });
        dataGeneratorInstance.setApi(api);
        return await setDataGenerator(api, dataGeneratorInstance, isPre);
    }
};

const getValid = async (api, isPre = true) => await api[`get${isPre ? 'Pre' : 'Post'}Valid`]();
const addValidToApi = async (api, action, isPre = true) => {
    const validInstance = await valid.create({ action });
    validInstance.setOwner(api);
    api[`add${isPre ? 'Pre' : 'Post'}Valid`](validInstance);
};
const removeValid = async (validInstance) => {
    if (validInstance) {
        const api = await validInstance.getOwner();
        await api.removePreValid(validInstance);
        await api.removePostValid(validInstance);
        validInstance.destroy();
    }
};

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
};