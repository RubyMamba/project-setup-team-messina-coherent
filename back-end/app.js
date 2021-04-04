const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object

const axios = require('axios'); // middleware for making requests to APIs

const morgan = require('morgan'); // middleware for nice logging of incoming HTTP requests
// use the morgan middleware to log all incoming http requests
//app.use(morgan('dev')); // morgan has a few logging default styles - dev is a nice concise color-coded style

// use the bodyparser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use('/static', express.static('public'));

/**
 * Typically, all middlewares would be included before routes
 * In this file, however, most middlewares are after most routes
 * This is to match the order of the accompanying slides
 */

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();

/**
 * Get metadata of tracks, albums, artists, shows, and episodes
 */

// Get 
function getTrackGenre(id) {
  spotifyApi.getTrack(id).then(
    function(data) {
        return spotifyApi.getArtist(data.album.artists.id);
      })
    .then(function(data) {
        console.log(data.genres);
        return data.genres;
    })
    .catch (function (err) {
        console.error(err);
    })
}

function playlistFinder(filter){
    spotifyApi.getPlaylistsForCategory(filter, {
        country: 'US',
        limit : 6,
        offset : 0
      })
    .then(function(data) {
        playlists.items.map(function(item){
            return item.id;
        })
    }
    .then(function(playlistID){
        return spotifyApi.getPlaylistTracks(playlistID);
    })
    .then(function(data){
        data.items.map(function(values){
            console.log(getTrackGenre(values.track.id))
        })
    }), function(err) {
      console.log("Something went wrong!", err);
    });
}



// route for HTTP GET requests to the root document
app.get('/', (req, res) => {
  res.send('Hello!');
});

// route for HTTP GET requests to /html-example
app.get('/party', (req, res) => {
  res.send();
});

app.listen(3000);

// export the express app we created to make it available to other modules
// module.exports = app