const axios = require('axios'); 
const NodeCache = require( "node-cache" );
const moviesCache = new NodeCache();



class Movies { // retrieves data for Movies 
    constructor(title, overview){
        this.title = title;
        this.overview = overview;

// response.send(movieapi.data)
    }
}
module.exports.movies = ('/movies', async(request, response) => { // route for movies data
    let citysearch = request.query.citysearch
    let moviestorage = moviesCache.get( citysearch );
    if(moviestorage == undefined){

        const movieapi = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.MOVIE_API_KEY}&query=${citysearch}`)
        if(citysearch == undefined){
            let error = 'no movie found'
            response.send(error);
        }else{
            let moviecarddata = movieapi.data.results.map((day) => {
                return new Movies(day.title, day.overview)
            })
            moviesCache.set(citysearch, moviecarddata, 360)
            response.send(moviecarddata)
            
        }
        
    }else{
        console.log('message')
        response.send(moviestorage);
    }
    
});
