const { Pool, defaults } = require("pg");

defaults.parseInt8 = true;

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: 5432,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
