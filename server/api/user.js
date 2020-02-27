const router = require('express').Router()
const { User } = require('../db/models')

router.put('/:id', function(req, res, next) {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(user => {
    return user.update(req.body)
  })
  .then(updatedUser => {
    req.user.user = updatedUser
    res.status(200).json(req.user)
  })
  .catch(next)
})

module.exports = router;
