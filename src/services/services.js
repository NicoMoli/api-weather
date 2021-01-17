var keysConfig = require('../config/config');
const axios = require('axios');
const publicIp = require('public-ip'); 

var public_ip = null;

class Servicios {
    async getLocationByIp() {

        public_ip = await publicIp.v4();
    
        const response = await axios.get(keysConfig.BASE_URL_IP_API + public_ip)
     
        return response.data;         
    }
    
    async getIPAndWeather() {
    
        public_ip = await publicIp.v4();
    
        const response = await axios.get(keysConfig.BASE_URL_IP_API + public_ip)
    
        const responseWeather = await axios.get(keysConfig.BASE_URL_CURRENT_WEATHER + response.data.city + '&appid=' + keysConfig.API_KEY +'&units=metric&lang=sp')
     
        return responseWeather.data;         
    }
    
    async getWeatherByCity(cityName) {
     
        const response = await axios.get(keysConfig.BASE_URL_CURRENT_WEATHER + cityName + '&appid=' + keysConfig.API_KEY +'&units=metric&lang=sp')
    
        return response.data;
    }

    async getIPAndWeatherForecast() {
        
        public_ip = await publicIp.v4();
        
        const response = await axios.get(keysConfig.BASE_URL_IP_API + public_ip)
    
        const responseWeather = await axios.get(keysConfig.BASE_URL_ONECALL + response.data.lat +'&lon=' + response.data.lon +'&appid=' + keysConfig.API_KEY + 
            '&exclude=minutely,hourly,alerts&units=metric&lang=sp');
    
        return responseWeather.data;   
    }
    
    async getWeatherForecast(cityName) {
        
        const response = await axios.get(keysConfig.BASE_URL_FORECAST + cityName +'&cnt=6&appid=' + keysConfig.API_KEY +'&units=metric&lang=sp');
       
        return response.data;
    }
    
    async getWeatherForecastByLatAndLong(latCity, lonCity) {
        
        const response = await axios.get(keysConfig.BASE_URL_ONECALL + latCity +'&lon=' + lonCity +'&appid=' + keysConfig.API_KEY + 
        '&exclude=minutely,hourly,alerts&units=metric&lang=sp');
    
        return response.data;
    }
}

module.exports = Servicios;