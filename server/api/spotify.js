const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
const { tokenRefresh } = require('../middleware/spotifyTokenRefresh');
const spotifyAPIBaseUri = 'https://api.spotify.com'
const spotifyAccountsBaseUri = 'https://accounts.spotify.com'

module.exports = router;

router.get('/refreshToken', tokenRefresh, (req, res, next) => {
  res.json(req.user.access)
})

router.get('/getTracks', tokenRefresh, (req, res, next) => {

  spotifyApi.setAccessToken(req.user.access)

  return spotifyApi.getMySavedTracks({
    limit: 2,
  })
  .then(data => {
    console.log('SPOTIFY DATA.BODY.ITEMS', data.body.items)
    res.send(data.body.items)
  })
  .catch(next)
})
