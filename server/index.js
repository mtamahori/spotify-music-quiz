const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session')
const db = require ('./db')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express();
module.exports = app;

if (process.env.NODE_ENV === 'test') {
  after('close the session store', () =>
  sessionStore.stopExpiringSessions())
}

if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use('/api', require('./api'))
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  const server = app.listen(PORT, () =>
  console.log(`Keep it locked on ${PORT}`))
}

const syncDb = () => db.sync();

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

if (require.main === module) {
  bootApp();
} else {
  createApp();
}
