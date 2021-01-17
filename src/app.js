var express = require('express') 
var app = express()       
var bodyParser = require('body-parser')
const request = require('supertest');

var port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())            

// nuestra ruta irá en http://localhost:3000/v1
var router = require('./routes')

app.use('/v1', router)

//levantamos el servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)

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


