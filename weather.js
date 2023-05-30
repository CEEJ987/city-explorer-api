'use strict';
const axios = require('axios');
const NodeCache = require("node-cache");
const weatherCache = new NodeCache();

module.exports.weatherData = ("/weather", async function (req, res) {
  console.log(req.query);
  let cityname = req.query.city;
  let lat = req.query.lat;
  let lon = req.query.lon;
  let weatherstorage = weatherCache.get(cityname);
  if (weatherstorage == undefined) {
    const weatherRequest = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily/?city=${cityname}&key=${process.env.WEATHER_API_KEY}`);
    console.log(weatherRequest.data);
    const weatherForecast = weatherRequest.data.data.map((day) => {
      class Forecast {
        constructor(date, description) {
          this.date = date;
          this.description = description;

        }
      }
      return new Forecast(day.valid_date, day.weather.description);
    });
    weatherCache.set(cityname, weatherForecast, 3600)
    res.send(weatherForecast);
  }else{
    response.send(weatherstorage);
  }

});

let cache = require('./cache.js');

module.exports.weathercache = function (latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
};

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}
