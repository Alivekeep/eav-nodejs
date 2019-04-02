const { query, pool } = require("../postgres");

/**
 * @desc creating Attribute
 * @param entityId {Number}
 * @param name {String}
 * @param dataType {String}
 * @return {Promise}
 */
const insertAttribute = async (entityId, name, dataType) =>
  query(
    `INSERT INTO attributes (entity_id, name, data_type) VALUES ($1, $2, $3) RETURNING id;`,
    [entityId, name, dataType]
  );

/**
 * @desc removing attributes
 * @param entityId {Number}
 * @return {Promise}
 */
const removeAttributes = async entityId =>
  query(`DELETE FROM attributes WHERE entity_id = $1;`, [entityId]);

module.exports = {
  insertAttribute,
  removeAttributes,
  pool
};
