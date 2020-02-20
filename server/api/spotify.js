const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
const { tokenRefresh } = require('../middleware/spotifyTokenRefresh');

module.exports = router;

router.use('/', tokenRefresh, (req, res, next) => {
  spotifyApi.setAccessToken(req.user.access)
  next();
})

// GENERAL SPOTIFY REQUESTS
// router.get('/:endpoint', (req, res, next) => {
//   return spotifyApi['getMy'+req.params.endpoint]()
//   .then(data => {
//     res.send(data.body.items)
//   })
//   .catch(next)
// })

router.get('/RecentlyPlayedTracks', (req, res, next) => {
  return spotifyApi.getMyRecentlyPlayedTracks()
    .then(data => {
      let recentArr = data.body.items;
      let tracks = [];
      recentArr.forEach(track => {
        tracks.push(track.track);
      })
      res.send(tracks)
    })
    .catch(next);
})

router.get('/TopTracks', (req, res, next) => {
  return spotifyApi.getMyTopTracks()
  .then(data => {
    let tracks = data.body.items
    res.send(tracks)
  })
  .catch(next);
})

router.get('/SavedTracks', (req, res, next) => {
  return spotifyApi.getMySavedTracks({limit: 50})
    .then(data => {
      let savedArr = data.body.items;
      let tracks = [];
      savedArr.forEach(track => {
        tracks.push(track.track);
      })
      res.send(tracks)
    })
    .catch(next);
})

router.get('/SavedAlbums', (req, res, next) => {
  return spotifyApi.getMySavedAlbums()
    .then(data => {
      let albums = data.body.items;
      let tracks = [];
      albums.forEach(album => {
        let albumTracks = album.album.tracks.items;
        albumTracks.forEach(albumTrack => {
          tracks.push(albumTrack)
        })
      })
      res.send(tracks)
    })
    .catch(next)
})

router.post('/play', (req, res, next) => {
  console.log('playerInstance', req.body.playerInstance)
  const uris = [ req.body.spotify_uri ]
  const device_id = req.body.playerInstance._options.id
  const options = {
    uris,
    device_id
  }
return spotifyApi.play(options).catch(next)
})

router.post('/pause', (req, res, next) => {
  const device_id = req.body.playerInstance._options.id
  const options = { device_id }
  return spotifyApi.pause(options).catch(next);
})
