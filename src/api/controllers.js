var servicios = require('../services/services.js')
var functions = new servicios();

module.exports = { 
    rutaBase: function(req, res) {
        res.status(200).send('Saludos desde express, ruta base');
    },
     
    getLocationByIp: function(req, res) {
        functions.getLocationByIp().then(resp => {
            res.status(200).json({ DataObject: resp });
        })
        .catch((e) => res.status(400).send("Ha ocurrido un error, intente más tarde. -" + e))
    },
    
    getWeatherByCity: function(req, res) {
    
        if(req.params.city) {
            functions.getWeatherByCity(req.params.city)
            .then(function (resp) {    
                res.status(200).json({ DataObject: resp });
            })
            .catch(function () {         
                res.status(400).send("Ha ocurrido un error, intente más tarde.");
            })
        }
        else {
            functions.getIPAndWeather()
            .then(resp => {
                res.status(200).json({ DataObject: resp });
            })
            .catch(() => res.status(400).send("Ha ocurrido un error, intente más tarde."))
        }
    },
    
    getWeatherForecast: function (req, res) {
        if(req.params.city) {
            functions.getWeatherForecast(req.params.city)
            .then(function (resp) {    
                res.status(200).json({ DataObject: resp });
            })
            .catch((error) =>          
                res.status(400).send("Ha ocurrido un error, intente más tarde.")
            )
        }
        else {
            functions.getIPAndWeatherForecast()
            .then(resp => {
                res.status(200).json({ DataObject: resp });
            })
            .catch(() => res.status(400).send("Ha ocurrido un error, intente más tarde."))
        }
    },
    
    getWeatherForecastByLatAndLong: function(req, res) {
    
        if(req.params.lat && req.params.lon) {
            functions.getWeatherForecastByLatAndLong(req.params.lat, req.params.lon)
            .then(function (resp) {    
                res.status(200).json({ DataObject: resp });
            })
            .catch((error) =>          
                res.status(400).send("Ha ocurrido un error, intente más tarde.")
            )
        }
    }
}