var router = require('express').Router()
var weather = require('./weather')

router.use('/', weather)

module.exports = router;