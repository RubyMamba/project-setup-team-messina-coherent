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

var credentials = {
  clientId: '5d968e8774bb44b38bb0a26b8ec1104a',
  clientSecret: 'ef94a00d195c462ea765c26987930804',
};

var spotifyApi = new SpotifyWebApi(credentials);

spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );

// var spotifyApi = new SpotifyWebApi();

/**
 * Get metadata of tracks, albums, artists, shows, and episodes
 */

// Get genre from track
function getTrackGenre(id, callback) {
    //console.log("Track ID: " + id)
  spotifyApi
    .getTrack(id)
    .then(function (data) {
        //console.log("Artist ID: " + data.body.artists[0].id)
        return spotifyApi.getArtist(data.body.artists[0].id);
    })
    .then(function (data) {
      //console.log(data.body.genres.pop());
      callback(data.body.genres.pop());
    })
    
    .catch(function (err) {
      console.error(err);
    });
    
}



function playlistFinder(filter, callback){

    // spotifyApi.searchPlaylists('rap', {
    //     country: 'US',
    //     limit : 2,
    //     offset : 0
    //   })
    // .then(function(data) {
    //   console.log(data.body);
    // }, function(err) {
    //   console.log("Something went wrong!", err);
    // });

    mainData = [];

    spotifyApi.searchPlaylists(filter, {
        country: 'US',
        limit : 6,
        offset : 0
      })
    .then(function(data) {
        //console.log(data)
        data.body.playlists.items.map(function(item){
            mainData.push(item);
            mainData.push('\n')
            
            spotifyApi.getPlaylistTracks(item.id).then(function(data){
                //console.log(data.body.items);
            })
            
        })
        callback(mainData)
    }
    // .then(function(playlistID){
    //     console.log(playlistID)
    //     return spotifyApi.getPlaylistTracks(playlistID);
    // })
    // .then(function(data){
    //     data.body.items.map(function(values){
    //         console.log(getTrackGenre(values.track.id))
    //     })
    // })
    , function(err) {
      console.log("Something went wrong!", err);
    });
}

// scopes = ['user-read-private', 'user-read-email'];

// route for HTTP GET requests to the root document
app.get('/', (req, res) => {
  res.send('Hello!');
});


// route for HTTP GET to see the genre of random song of choice
app.get('/genre-getter', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  getTrackGenre('4DuUwzP4ALMqpquHU0ltAB', function(result){
    console.log(result)
    res.send(result);
  });
  
});

app.get('/party', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('party', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});

app.get('/in-my-feels', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('feels', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});

app.get('/on-my-grind', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('workout', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});

app.get('/plotting-my-revenge', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('motivated', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});

app.get('/romantic', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('romantic', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});

app.get('/mood-boosters', async (req, res) => {
    //var result = await spotifyApi.getUserPlaylists();
  playlistFinder('happy', function(result){
    console.log(result);
    res.send(result);
  })
  
  
});


app.listen(3000);

// export the express app we created to make it available to other modules
// module.exports = app
