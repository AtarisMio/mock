const router = require('express').Router();
const auth = require('./../../midwares/auth');
const Packing = require('./../../../../utils/packing');

const {
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
} = require('./../../functions/apis');

router
    .get('/', auth(auth.user), async (req, res) => {
        const apis = await req.userInfo.getApi();
        if (apis.length) {
            const plainApis = apis.map(api => api.get({ plain: true }))
                .map(api => { delete api.ownerId; delete api.userId; return api; });
            res.status(200).json(Packing({ apis: plainApis }, 0, 'all apis here', ''));
        } else {
            res.status(404).json(Packing({ apis: [] }, 404, 'no apis here', '找不到资源'));
        }
    }) // done
    .post('/', auth(auth.user), async (req, res) => {
        const { apiPath, method, title, description, author } = req.body;
        const apiInstance = await addApi(req.userInfo, { apiPath, method, title, description, author });
        if (apiInstance) {
            const plain = apiInstance.get({ plain: true });

            delete plain.ownerId;

            res.status(201).json(Packing(plain, 0, 'add regular of api', '添加api规则'));
        } else {
            res.status(406).json(Packing({}, 406, 'can\'t add api', '不能添加该api'));
        }
    }) // done
    .get('/:id', auth(auth.user), async (req, res) => {
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } }).map(async api => {
            const apiObject = api.get({ plain: true });
            apiObject.preDataGenerator = await getDataGenerator(api);
            apiObject.postDataGenerator = await getDataGenerator(api, false);
            apiObject.preValid = await getValid(api);
            apiObject.postValid = await getValid(api, false);
            return apiObject;
        }).map(api => {
            delete api.ownerId;
            delete api.userId;
            return api;
        });
        if (api.length) {
            res.status(200).json(Packing({ api: api[0] }));
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id', '找不到对应api'));
    }) // done
    .delete('/:id', auth(auth.user), async (req, res) => {
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api.length) {
            console.log(1);
            await removeApi(req.userInfo, api[0]);
            res.status(204).send();
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id of ' + id, '找不到对应api'));
    }) // done
    .patch('/:id', auth(auth.user), async (req, res) => {
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api) {
            const { apiPath, method, title, description, author,
                preDataGenerator, postDataGenerator, preValid, postValid } = req.body;
            if (apiPath) {
                api[0].set({ apiPath });
            }
            if (method) {
                api[0].set({ method });
            }
            if (title) {
                api[0].set({ title });
            }
            if (description) {
                api[0].set({ description });
            }
            if (author) {
                api[0].set({ author });
            }
            if (preDataGenerator) {
                // todo
            }
            if (postDataGenerator) {
                // todo
            }
            if (preValid) {
                // todo
            }
            if (postValid) {
                // todo
            }
            api[0].save();
            // todo 更新api内容
            res.status(200).json(Packing({ api: api[0] }));
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id of ' + id, '找不到对应api'));
    })
    .get('/:id/preDataGenerator', auth(auth.user), async (req, res) => {
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api.length) {
            const generator = await getDataGenerator(api[0]);
            if (generator) {
                res.status(200).json(Packing({ preDataGenerator: generator }));
            } else {
                res.status(404).json(Packing({}, 404, 'can\'t find preDataGenerator', '找不到前置数据生成器'));
            }
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id', '找不到对应api'));
    }) // done
    .get('/:id/postDataGenerator', auth(auth.user), async (req, res) => {
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api.length) {
            const generator = await getDataGenerator(api[0], false);
            if (generator) {
                res.status(200).json(Packing({ postDataGenerator: generator }));
            } else {
                res.status(404).json(Packing({}, 404, 'can\'t find postDataGenerator', '找不到后置数据生成器'));
            }
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id', '找不到对应api'));
    }) // done
    .get('/:id/preValid', auth(auth.user), async (req, res) => {
        // todo 获取preValid
    })
    .patch('/:id/preValid/:validId', auth(auth.user), async (req, res) => {
        // todo 修改preValid
    })
    .delete('/:id/preValid/:validId', auth(auth.user), async (req, res) => {
        // todo 删除preValid
    })
    .get('/:id/postValid', auth(auth.user), async (req, res) => {
        // todo 获取postValid
    })
    .patch('/:id/postValid/:validId', auth(auth.user), async (req, res) => {
        // todo 更新postValid
    })
    .delete('/:id/postValid/:validId', auth(auth.user), async (req, res) => {
        // todo 删除postValid
    });

module.exports = router;