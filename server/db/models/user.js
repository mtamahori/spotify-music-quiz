const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  spotifyUserId: {
    type: Sequelize.STRING
  },
  correct: {
    defaultValue: 0,
    type: Sequelize.INTEGER
  },
  rounds: {
    defaultValue: 0,
    type: Sequelize.INTEGER
  }
})

module.exports = User;
