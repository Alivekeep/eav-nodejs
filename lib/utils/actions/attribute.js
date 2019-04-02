const { query, pool } = require("../postgres");

/**
 * @desc creating Attribute
 * @return {Promise}
 */
const insertAttribute = async (entityId, name, dataType) =>
  query(
    `INSERT INTO attributes (entity_id, name, data_type) VALUES ($1, $2, $3) RETURNING id; `,
    [entityId, name, dataType]
  );

module.exports = {
  insertAttribute,
  pool
};
