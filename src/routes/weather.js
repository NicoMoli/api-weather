var router = require('express').Router()
var controller = require ('../api/controllers')


router.get('/', function(req, res) {
    controller.rutaBase(req, res);
})

router.get('/location', function(req, res) {
    controller.getLocationByIp(req, res)
})

router.get('/current/:city?', function(req, res) {
    controller.getWeatherByCity(req, res)
})

router.get('/forecast/:city?', function(req, res) {
    controller.getWeatherForecast(req, res)
})

router.get('/forecast/:lat?/:lon?', function(req, res) {
    controller.getWeatherForecastByLatAndLong(req, res)
})


module.exports = router