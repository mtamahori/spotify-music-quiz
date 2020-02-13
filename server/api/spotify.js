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

router.get('/recentlyPlayed', tokenRefresh, (req, res, next) => {
  console.log('REQ USER ACCESS', req.user)
  spotifyApi.setAccessToken(req.user.access)

  return spotifyApi.getMyRecentlyPlayedTracks({
    limit: 4
  })
  .then(data => {
    // console.log('SPOTIFY DATA.BODY.ITEMS', data.body.items)
    res.send(data.body.items)
  })
  .catch(next)
})

router.post('/play', (req, res, next) => {
  spotifyApi.setAccessToken(req.user.access)
  const uris = [ req.body.spotify_uri ]
  const device_id = req.body.playerInstance._options.id
  const options = {
    uris,
    device_id
  }
  return spotifyApi.play(options).catch(next)
})
