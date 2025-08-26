const { Pool } = require('pg');

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Luxora',
  password: 'opas1@',
  port: 5432
});

module.exports = db;
