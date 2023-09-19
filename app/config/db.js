const debug = require('debug')('SQL:log');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.PG_URL,
});

pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

module.exports = pool;


