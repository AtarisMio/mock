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
            const _preDataGenerator = await getDataGenerator(api);
            const _postDataGenerator = await getDataGenerator(api, false);
            apiObject.preDataGenerator = _preDataGenerator && _preDataGenerator.generator;
            apiObject.postDataGenerator = _postDataGenerator && _postDataGenerator.generator;
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
    .put('/:id', auth(auth.user), async (req, res) => {
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
                setDataGeneratorToApi(api[0], JSON.parse(preDataGenerator), true);
                // todo
            }
            if (postDataGenerator) {
                // todo
                setDataGeneratorToApi(api[0], JSON.parse(preDataGenerator), false);
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
    .put('/:id/preDataGenerator', auth(auth.user), async (req, res) => {
        // todo 修改preDataGenerator
    })
    .delete('/:id/preDataGenerator', auth(auth.user), async (req, res) => {
        // 删除preDataGenerator
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api.length) {
            removeDataGenerator(api[0]);
            res.status(204).end();
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id', '找不到对应api'));
    })
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
    .put('/:id/postDataGenerator', auth(auth.user), async (req, res) => {
        // todo 修改postDataGenerator
    })
    .delete('/:id/postDataGenerator', auth(auth.user), async (req, res) => {
        // 删除postDataGenerator
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api.length) {
            removeDataGenerator(api[0], false);
            res.status(204).end();
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id', '找不到对应api'));
    })
    .get('/:id/preValid', auth(auth.user), async (req, res) => {
        // 获取preValid
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api.length) {
            const valid = await getValid(api[0]);
            if (valid) {
                res.status(200).json(Packing({ preValid: valid }));
            } else {
                res.status(404).json(Packing({}, 404, 'can\'t find preValid', '找不到前置数据验证器'));
            }
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id', '找不到对应api'));
    }) // done
    .put('/:id/preValid/:validId', auth(auth.user), async (req, res) => {
        // todo 修改preValid
    })
    .delete('/:id/preValid/:validId', auth(auth.user), async (req, res) => {
        // 删除preValid
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api.length) {
            const valid = await getValid(api[0], false);
            if (valid) {
                await removeValid(valid);
                res.status(204).end();
            } else {
                res.status(404).json(Packing({}, 404, 'can\'t find preValid', '找不到前置数据验证器'));
            }
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id', '找不到对应api'));
    })
    .get('/:id/postValid', auth(auth.user), async (req, res) => {
        // 获取postValid
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api.length) {
            const valid = await getValid(api[0], false);
            if (valid) {
                res.status(200).json(Packing({ postValid: valid }));
            } else {
                res.status(404).json(Packing({}, 404, 'can\'t find postValid', '找不到后置数据验证器'));
            }
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id', '找不到对应api'));
    })
    .put('/:id/postValid/:validId', auth(auth.user), async (req, res) => {
        // todo 更新postValid
    })
    .delete('/:id/postValid/:validId', auth(auth.user), async (req, res) => {
        // 删除postValid
        const { id } = req.params;
        const api = await req.userInfo.getApi({ where: { id } });
        if (api.length) {
            const valid = await getValid(api[0], false);
            if (valid) {
                await removeValid(valid);
                res.status(204).end();
            } else {
                res.status(404).json(Packing({}, 404, 'can\'t find postValid', '找不到后置数据验证器'));
            }
            return;
        }
        res.status(404).json(Packing({}, 404, 'can\'t find id', '找不到对应api'));
    });

module.exports = router;