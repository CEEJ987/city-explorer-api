'use strict';

require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors'); // Enable Cross-Origin Resource Sharing (CORS)
const express = require("express"); // Import the Express framework
const axios = require('axios'); // HTTP client for making requests
const  {weatherData} = require('./weather'); // Import the getWeather function from the weather module
const {movies} = require('./movies'); // Import the getMovies function from the movies module

const app = express(); // Create an instance of the Express application

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

app.get("/", (request, response) => {
  response.send("Something Else"); // Handle the root route and send a response
});

app.get("/weather", weatherHandler); // Handle GET requests to /weather route
app.get('/movies', moviesHandler); // Handle GET requests to /movies route

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send(error.message); // Error handling middleware, logs the error and sends a 500 response with the error message
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server up on port ${process.env.PORT || 3001}`); // Start the server and listen on the specified port or fallback to 3001
});

function weatherHandler(request, response) {
  const { lat, lon} = request.query; // Extract latitude and longitude from query parameters
  console.log(lat, lon);
  weatherData(request, response) // Call the Weather function with the provided latitude and longitude
    .then(summaries => response.send(summaries)) // Send the weather summaries as the response
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!'); // Handle errors and send a 500 response
    });
}

function moviesHandler(request, response) {
  const query = request.query; // Extract the query parameter from the request
  movies(request, response) // Call the Movies function with the provided query
    .then(movies => response.send(movies)) // Send the movies as the response
    //myCache.set( key, val, [ ttl ] )


    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!'); // Handle errors and send a 500 response
    });
}

