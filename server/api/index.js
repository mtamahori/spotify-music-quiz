const router = require('express').Router()

router.use('/user', require('./user'));
router.use('/spotify', require('./spotify'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router;
