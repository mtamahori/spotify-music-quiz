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
    (token, refreshToken, profile, done) => {

      const spotifyUserId = profile.id;
      let username;
      if (profile.displayName === null) username = profile.id;
      else username = profile.displayName;

      User.findOne({where: {spotifyUserId}})
        .then(foundUser => {
          if (!foundUser) {
            User.create({username, spotifyUserId})
            .then(createdUser => {
              let user = { id: createdUser.id, user: createdUser, access: token, refreshToken }
              return done(null, user);
            })
          }
          else {
            let user = {id: foundUser.id, user: foundUser, access: token, refreshToken}
            console.log('THE USER WE WANT', user)
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
