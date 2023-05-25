'use strict';

require('dotenv').config(); //enables process .env
const cors = require('cors'); // allows cross origin resource
const express = require("express"); 
const Weather = require('./data/weather.json'); // imports data from weather json file
const fs = require('fs'); // Allows us to read and write code down
const axios = require('axios'); 
const weather = require('./weather');
const movies = require('./movies');



// console.log(Weather)
const app = express();


app.use(cors()); // allows to cross origin resources
app.use(express.json());

app.get("/", (request, response) => { // route for response of something
    response.send("Something Else");
});

app.get("/weather", weather.weather);
app.get('/movies', movies.movies);


app.use((error, request, response, next) => { // catches errors
    console.error(error);
    response.status(500).send(error.message);
});

app.listen(3001, () => { // server listner
    console.log("Listen on the port 3001");
});



