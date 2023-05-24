'use strict';

require('dotenv').config(); //enables process .env
const cors = require('cors'); // allows cross origin resource
const express = require("express"); // 
const Weather = require('./data/weather.json'); // imports data from weather json file
const fs = require('fs'); // Allows us to read and write code down
const axios = require('axios'); // 



// console.log(Weather)

class Forecast {    // retrieves data for weatherForecast
    constructor(date, description){
        this.date = date;
        this.description = description;
    }
}
class Movies { // retrieves data for Movies 
    constructor(title, overview){
        this.title = title;
        this.overview = overview;

    }
}
const app = express();


app.use(cors()); // allows to cross origin resources
app.use(express.json());

app.get("/", (request, response) => { // route for response of something
    response.send("Something Else");
});

app.get("/weather", async (req, res) => { // route for weather, longitude and latitude.
    // console.log(request.query)
    let Lat = req.query.lat;
    let Lon = req.query.lon;
    let cityname = req.query.city;
    var weatherrequest = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily/?city=${cityname}&key=${process.env.KEY}`)
    console.log(weatherrequest.data)
          let weatherforecast = weatherrequest.data.data.map((day) => {
            return new Forecast(day.valid_date, day.weather.description)
        })
    res.send(weatherforecast)
    /*let loc = {
        Lat,
        Lon,
        searchquery

    }*/

    // console.log("Lat", Lat)
    // console.log("Lon", Lon)
    // let findlocation = {};
    // let weatherforecast = {};

    // if (Lat == undefined || Lon == undefined) {
    //     response.status(500).send("missing something");

    // } else {
    //     findlocation = Weather.find((element) => {
    //         if (Lat == element.lat ||
    //             Lon == element.lon )
    //              {
    //             return true
    //         } else {

    //             return false
    //         }        
    //     });
    //     weatherforecast = findlocation.data.map((day) => {
    //         return new Forecast(day.valid_date, day.weather.description)
    //     })
    //     response.send(weatherforecast);
    
});

// app.get('*', (request, response) => {
//      response.status(404).send('Not Found');
// });

app.use((error, request, response, next) => { // catches errors
    console.error(error);
    response.status(500).send(error.message);
});

app.get('/movies', async(request, response) => { // route for movies data
    let citysearch = request.query.citysearch
    const movieapi = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIE_API_KEY}&query=${citysearch}`)
    // response.send(movieapi.data)
    if(citysearch == undefined){
        let error = 'no movie found'
        response.send(error);
    }else{
        let moviecarddata = movieapi.data.results.map((day) => {
            return new Movies(day.title, day.overview)
        })
        response.send(moviecarddata)
    }
    
    
})
app.listen(3001, () => { // server listner
    console.log("Listen on the port 3001");
});


