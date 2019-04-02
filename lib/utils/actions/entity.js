const { query, pool } = require("../postgres");

/**
 * @desc creating Entity
 * @return {Promise}
 */
const insertEntity = async name =>
  query(`INSERT INTO entities (name) VALUES ($1) RETURNING id; `, [name]);

module.exports = {
  insertEntity,
  pool
};
