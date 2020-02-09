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
    res.status(200).json(updatedUser)
  })
  .catch(next)
})

module.exports = router;
