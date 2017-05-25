const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile('./template.html', {
        root: __dirname
    });
});

module.exports = router;