const pg = require('pg');

const conn = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = conn;
