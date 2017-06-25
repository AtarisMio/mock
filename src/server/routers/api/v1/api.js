const config = require('./../../../../../config').httpSetting;
const router = require('express').Router();
const auth = require('./../../midwares/auth');
const Packing = require('./../../../../utils/packing');

const {
    addApi
} = require('./../../functions/apis')

router
    .get('/', auth(auth.user), async (req, res) => {
        const apis = await req.userInfo.getApi();
        if (apis.length) {
            res.status(200).json(Packing({ apis }, 0, 'all apis here', ''));
        } else {
            res.status(404).json(Packing({ apis: [] }, 404, 'no apis here', '找不到资源'));
        }
    })
    .put('/', auth(auth.user), async (req, res) => {
        const { apiPath, method, title, description, author } = req.body;
        const apiInstance = await addApi(req.userInfo, { apiPath, method, title, description, author });
        if (apiInstance) {
            res.status(200).json(Packing(apiInstance, 0, 'add regular of api', '添加api规则'));
        } else {
            res.status(406).json(Packing({}, 406, 'can\'t add api', '不能添加该api'));
        }
    })

module.exports = router;