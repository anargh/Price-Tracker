const MongoClient = require('mongodb').MongoClient;
const config = require('./config')

const url = `mongodb://${config.dbHost}`;
const dbName = config.dbName;

// TODO: Add authentication
const client = new MongoClient(url, { useUnifiedTopology: true });

// TODO: This is in connection pool. Do I Need to rethink how to reuse db connection?
client.connect((error, res) => {
  if (error) {
    return console.log('Error connecting to database ', error);
  }
  console.log('Connected to database');
});

module.exports = client.db(dbName);
