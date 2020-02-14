const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
const { tokenRefresh } = require('../middleware/spotifyTokenRefresh');

module.exports = router;

router.use('/', tokenRefresh, (req, res, next) => {
  spotifyApi.setAccessToken(req.user.access)
  next();
})

router.get('/:endpoint', (req, res, next) => {
  return spotifyApi['getMy'+req.params.endpoint]({
    limit: 4
  })
  .then(data => {
    res.send(data.body.items)
  })
  .catch(next)
})

router.post('/play', (req, res, next) => {
    const uris = [ req.body.spotify_uri ]
  const device_id = req.body.playerInstance._options.id
  const options = {
    uris,
    device_id
  }
  return spotifyApi.play(options).catch(next)
})
