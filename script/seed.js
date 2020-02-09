'use strict'

const db = require('../server/db')
const { User } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('DB RE-SYNCING')
}

async function runSeed() {
  console.log('Running seed ..... ')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed;
