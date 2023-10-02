const router = require('express').Router()

router.get('/config', (req, res) => {
    const configData = {
        accessTokenSecret : process.env.ACCESS_TOKEN_SECRET
    }

    res.json(configData);
})

module.exports = router;