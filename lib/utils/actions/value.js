const { query, pool } = require("../postgres");

/**
 * @desc creating Value
 *
 * @param attributeId {Number}
 * @param value {String}
 * @return {Promise}
 */
const insertValue = async (attributeId, value) =>
  query(
    `INSERT INTO values (attribute_id, value) VALUES ($1, $2) RETURNING id; `,
    [attributeId, value]
  );

module.exports = {
  insertValue,
  pool
};
