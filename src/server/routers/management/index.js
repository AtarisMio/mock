const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendfile('./template.html', {
        root: __dirname
    });
});

module.exports = router;