'use strict';

require('dotenv').config(); //enables process .env
const cors = require('cors');
const express = require("express");
const Weather = require('./data/weather.json');
const fs = require('fs'); // Allows us to read and write code down


// console.log(Weather)

class Forecast {
    constructor(date, description){
        this.date = date;
        this.description = description;
    }
}
const app = express();


app.use(cors()); // allows to cross origin resources
app.use(express.json());

app.get("/", (request, response) => {
    response.send("Something Else");
});

app.get("/weather", (request, response) => {
    // console.log(request.query)
    let Lat = request.query.lat;
    let Lon = request.query.lon;
    /*let loc = {
        Lat,
        Lon,
        searchquery

    }*/

    console.log("Lat", Lat)
    console.log("Lon", Lon)
    let findlocation = {};
    let weatherforecast = {};

    if (Lat == undefined || Lon == undefined) {
        response.status(500).send("missing something");

    } else {
        findlocation = Weather.find((element) => {
            if (Lat == element.lat ||
                Lon == element.lon )
                 {
                return true
            } else {

                return false
            }        
        });
        weatherforecast = findlocation.data.map((day) => {
            return new Forecast(day.valid_date, day.weather.description)
        })
        response.send(weatherforecast);
    } 
});

app.get('*', (request, response) => {
    response.status(404).send('Not Found');
});

app.use((error, request, response, next) => {
    console.error(error);
    response.status(500).send(error.message);
});

app.listen(3001, () => {
    console.log("Listen on the port 3001");
});
