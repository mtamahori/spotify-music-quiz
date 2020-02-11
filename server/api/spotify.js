const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node');
const credentials = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: process.env.SPOTIFY_CALLBACK
}
const spotifyApi = new SpotifyWebApi(credentials);
const scopes = ['user-read-email', 'user-read-private', 'user-read-playback-state', 'streaming', 'user-modify-playback-state', 'user-top-read', 'user-read-currently-playing', 'user-read-recently-played', 'user-library-read']

// const authorizeURL = spotifyApi.createAuthorizeURL(scopes)

// router.get('/authorize', (req, res, next) => {
//   console.log('AUTHORIZEURL', authorizeURL)
//   spotifyApi.authorizationCodeGrant(authorizeURL)
//     .then((res) => {
//     let data = res.data;
//     console.log('The token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);
//     console.log('The refresh token is ' + data.body['refresh_token']);

//     spotifyApi.setAccessToken(data.body['access_token']);
//     spotifyApi.setRefreshToken(data.body['refresh_token']);
//   })
//   .catch(next)
// })


module.exports = router;
