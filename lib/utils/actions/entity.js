const { query, pool } = require("../postgres");

/**
 * @desc creating Entity
 * @param name {String}
 * @return {Promise}
 */
const insertEntity = async name =>
  query(`INSERT INTO entities (name) VALUES ($1) RETURNING id; `, [name]);

/**
 * @desc update Entity
 * @param id {Number}
 * @param name {String}
 * @return {Promise}
 */
const updateEntity = async (id, name) =>
  query(`UPDATE entities SET name = $1 WHERE id = $2`, [name, id]);

/**
 * @desc delete Entity
 * @param id {Number}
 * @return {Promise}
 */
const deleteEntity = async id =>
  query(`DELETE FROM entities WHERE id = $1`, [id]);

/**
 * @desc Getting entity by ID
 * @param id {Number}
 * @return {Promise}
 */
const getById = async id =>
  query(
    `SELECT e.id   entity_id,
                 e.name entity_name,
                 a.id   attribute_id,
                 a.data_type,
                 a.name attribute_name,
                 v.id   value_id,
                 v.value
          FROM entities e
                 LEFT JOIN attributes a on e.id = a.entity_id
                 LEFT JOIN values v on a.id = v.attribute_id
          WHERE e.id = $1;`,
    [id]
  );

/**
 * @desc Getting entities
 * @return {Promise}
 */
const getAllEntities = async () =>
  query(
    `SELECT e.id   entity_id,
                 e.name entity_name,
                 a.id   attribute_id,
                 a.data_type,
                 a.name attribute_name,
                 v.id   value_id,
                 v.value
          FROM entities e
                 LEFT JOIN attributes a on e.id = a.entity_id
                 LEFT JOIN values v on a.id = v.attribute_id;`
  );

module.exports = {
  insertEntity,
  getById,
  getAllEntities,
  updateEntity,
  deleteEntity,
  pool
};
