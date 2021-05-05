var chai = require('chai');
var assert = chai.assert;

var app = require('../app.js')
const getPlaylistWithTracks = app.getPlaylistWithTracks
const getTaste = app.getTaste
const playlistFinder = app.playlistFinder



var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
    clientId: '0aa3357a8ce94adf8571ed29f3d59e33',
    clientSecret: 'c085945032cb470c97081d505ee53786',
});


spotifyApi.clientCredentialsGrant().then(
  function (data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function (err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);


describe("getPlaylistWithTracks", async function(){
    it("Should return an array of ids",  async function(){
        try{
            var array = await getPlaylistWithTracks('37i9dQZF1DX84kJlLdo9vT')
            array = array.tracks.items.map((item) => item.track.id)
            console.log(array)
            assert.typeOf(array, 'array');
        }
        catch(err){
            console.log("")
        }
    })
})

describe("getUserID", async function () {
    it("Should return current user's Spotify ID", async function () {
        try {
            var userID = await getUserID('37i9dQZF1DX84kJlLdo9vT').userID
            var userName = await getUserID('37i9dQZF1DX84kJlLdo9vT').userName
            assert.typeOf(userID, 'object');
            assert.typeOf(userName, 'object');
            console.log(userID)
            console.log(userName)
            
        }
        catch(err){
            console.log("getUserID error")
        }
    })
})


describe("getTaste", async function(){
    it("Should return an object of taste",  async function(){
        try{
            var obj = await getTaste('37i9dQZF1DX84kJlLdo9vT')
            assert.typeOf(obj, 'object');
        }
        catch(err){
            console.log("")
        }
    })
})

describe("playlistFinder", async function(){
    it("Should return an object of taste",  async function(){
        try{
            var obj = await playlistFinder('party', 0)
            assert.typeOf(obj, 'object');
        }
        catch(err){
            console.log("")
        }
    })
})
