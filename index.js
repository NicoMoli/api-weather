const express = require("express");
const axios = require('axios');
const publicIp = require('public-ip');
const request = require('supertest');

const app = express();

//Variables:
const apiKey = '2f3ad6ad4ee41f42b2c4fab8ba58024e';
var public_ip = null;


app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

app.get('/v1', function (req, res) {
    res.status(200).send('Saludos desde express, ruta base');
});

app.get('/v1/location', async function (req, res) {

    getIPAndWeather()
    .then(resp => {
        res.status(200).json({ DataObject: resp });
    })
    .catch(() => res.status(400).send("Ha ocurrido un error, intente más tarde."))
});


app.get('/v1/current/:city?',async function (req, res) {

    if(req.params.city) {
        getWeatherByCity(req.params.city)
        .then(function (resp) {    
            res.status(200).json({ DataObject: resp });
        })
        .catch(function () {         
            res.status(400).send("Ha ocurrido un error, intente más tarde.");
        })
    }
    else {
        getIPAndWeather()
        .then(resp => {
            res.status(200).json({ DataObject: resp });
        })
        .catch(() => res.status(400).send("Ha ocurrido un error, intente más tarde."))
    }
});

app.get('/v1/forecast/:city?',async function (req, res) {

    if(req.params.city) {
        getWeatherForecast(req.params.city)
        .then(function (resp) {    
            res.status(200).json({ DataObject: resp });
        })
        .catch((error) =>          
            res.status(400).send("Ha ocurrido un error, intente más tarde.")
        )
    }
    else {
        getIPAndWeatherForecast()
        .then(resp => {
            res.status(200).json({ DataObject: resp });
        })
        .catch(() => res.status(400).send("Ha ocurrido un error, intente más tarde."))
    }
});

app.get('/v1/forecast/:lat?/:lon?',async function (req, res) {

    if(req.params.lat && req.params.lon) {
        getWeatherForecastByLatAndLong(req.params.lat, req.params.lon)
        .then(function (resp) {    
            res.status(200).json({ DataObject: resp });
        })
        .catch((error) =>          
            res.status(400).send("Ha ocurrido un error, intente más tarde.")
        )
    }
});

async function getIPAndWeather() {

    public_ip = await publicIp.v4();

    const response = await axios.get('http://ip-api.com/json/'+ public_ip)

    const responseWeather = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + response.data.city + '&appid=' + apiKey +'&units=metric')
 
    return responseWeather.data;         
}

async function getWeatherByCity(cityName) {
 
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey +'&units=metric')

    return response.data;
}

async function getIPAndWeatherForecast() {
    
    public_ip = await publicIp.v4();
    
    const response = await axios.get('http://ip-api.com/json/'+ public_ip)

    const responseWeather = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + response.data.lat +'&lon=' + response.data.lon +'&appid=' + apiKey + 
        '&exclude=minutely,hourly,alerts&units=metric&lang=sp');

    return responseWeather.data;   
}

async function getWeatherForecast(cityName) {
    
    const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + cityName +'&cnt=6&appid=' + apiKey +'&units=metric');
   
    return response.data;
}

async function getWeatherForecastByLatAndLong(latCity, lonCity) {
    
    const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + latCity +'&lon=' + lonCity +'&appid=' + apiKey + 
    '&exclude=minutely,hourly,alerts&units=metric&lang=sp');
   
    return response.data;
}

//Tests:
request(app)
    .get('/v1/location')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        if(res)
            console.log("Test v1/location OK!")
        if (err) throw err;
    });
 
request(app)
    .get('/v1/current')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        if(res)
            console.log("Test /v1/current OK!")
        if (err) throw err;
    });
 
request(app)
    .get('/v1/current/rosario')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        if(res)
            console.log("Test /v1/current/rosario OK!")
        if (err) throw err;
}); 

request(app)
    .get('/v1/forecast')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        if(res)
            console.log("Test /v1/forecast OK!")
        if (err) throw err;
}); 

request(app)
    .get('/v1/forecast/cordoba')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        if(res)
            console.log("Test /v1/forecast/cordoba OK!")
        if (err) throw err;
    }); 