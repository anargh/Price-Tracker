const dotenv = require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenRounds: process.env.TOKEN_ROUNDS
}