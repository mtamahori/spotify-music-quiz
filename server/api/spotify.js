const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
const { tokenRefresh } = require('../middleware/spotifyTokenRefresh');

module.exports = router;

router.get('/recentlyPlayedTracks', tokenRefresh, (req, res, next) => {
  spotifyApi.setAccessToken(req.user.access)
  return spotifyApi.getMyRecentlyPlayedTracks({
    limit: 4
  })
  .then(data => {
    res.send(data.body.items)
  })
  .catch(next)
})

router.get('/topTracks', tokenRefresh, (req, res, next) => {
  spotifyApi.setAccessToken(req.user.access)
  return spotifyApi.getMyTopTracks({
    limit: 4
  })
  .then(data => {
    res.send(data.body.items)
  })
  .catch(next)
})

router.get('/savedTracks', tokenRefresh, (req, res, next) => {
  spotifyApi.setAccessToken(req.user.access)
  return spotifyApi.getMySavedTracks({
    limit: 4
  })
  .then(data => {
    res.send(data.body.items)
  })
  .catch(next)
})

router.get('/savedAlbums', tokenRefresh, (req, res, next) => {
  spotifyApi.setAccessToken(req.user.access)
  return spotifyApi.getMySavedAlbums({
    limit: 4
  })
  .then(data => {
    res.send(data.body.items)
  })
  .catch(next)
})

router.get('/topArtists', tokenRefresh, (req, res, next) => {
  spotifyApi.setAccessToken(req.user.access)
  return spotifyApi.getMyTopArtists({
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
