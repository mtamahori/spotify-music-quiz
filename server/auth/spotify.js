const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy;
const { User } = require('../db/models')

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID and/or secret not found. Skipping Spotify OAuth.')
} else {
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (accessToken, refreshToken, profile, done) => {

      const spotifyUserId = profile.id;
      let username;
      if (profile.displayName === null) username = profile.id;
      else username = profile.displayName;
      // const email = profile.emails[0].value;
      // const imgurPhoto = profile.photos[0];

      User.findOne({where: {spotifyUserId}})
        .then(foundUser => {
          if (!foundUser) {
            User.create({username, spotifyUserId})
            .then(createdUser => {
              let user = { id: createdUser.id, user: createdUser, access: accessToken, refreshToken }
              return done(null, user);
            })
          }
          else {
            let user = {id: foundUser.id, user: foundUser, access: accessToken, refreshToken}
            return done(null, user)
          }
        })
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-read-playback-state', 'streaming', 'user-modify-playback-state', 'user-top-read', 'user-read-currently-playing', 'user-read-recently-played', 'user-library-read']
  }))

  router.get('/callback', passport.authenticate('spotify', {
    successRedirect: '/main',
    failureRedirect: '/login'
  }))

}

module.exports = router;
