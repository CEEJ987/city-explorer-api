const axios = require('axios'); 

module.exports.movies = ('/movies', async(request, response) => { // route for movies data
    let citysearch = request.query.citysearch
    const movieapi = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIE_API_KEY}&query=${citysearch}`)
    class Movies { // retrieves data for Movies 
        constructor(title, overview){
            this.title = title;
            this.overview = overview;
    
    // response.send(movieapi.data)
        }
    }
    if(citysearch == undefined){
        let error = 'no movie found'
        response.send(error);
    }else{
        let moviecarddata = movieapi.data.results.map((day) => {
            return new Movies(day.title, day.overview)
        })
        response.send(moviecarddata)
    }
    
    
});
