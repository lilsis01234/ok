const requireAuth = require('../middlware/authMiddleware');

const router = require('express').Router()

router.get('/home', requireAuth, (req, res) => {
    res.render('home')
})

module.exports = router;