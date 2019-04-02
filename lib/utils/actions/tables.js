const { query, pool } = require("../postgres");

/**
 * @desc creating Entities table
 * @return {Promise}
 */
const createEntityTable = async () =>
  query(`
    CREATE TABLE IF NOT EXISTS entities
    (
      id   bigserial PRIMARY KEY,
      name varchar(255) UNIQUE
    );
  `);

/**
 * @desc creating Attributes table
 * @return {Promise}
 */
const createAttributeTable = async () =>
  query(`
    CREATE TABLE IF NOT EXISTS attributes
    (
      id         bigserial PRIMARY KEY,
      entity_id  bigint,
      name       varchar(255),
      data_type  varchar(255),
      FOREIGN KEY (entity_id) REFERENCES entities (id)
    );
  `);

/**
 * @desc creating Values table
 * @return {Promise}
 */
const createValueTable = async () =>
  query(`
    CREATE TABLE IF NOT EXISTS values
    (
      id           bigserial PRIMARY KEY,
      attribute_id bigint,
      value        varchar(255),
      FOREIGN KEY (attribute_id) REFERENCES attributes (id)
    );
  `);

/**
 * @desc truncate all EAV tables
 */
const truncateTables = async () => {
  await query(`
    TRUNCATE TABLE attributes RESTART IDENTITY CASCADE;
  `);
  await query(`
    TRUNCATE TABLE values RESTART IDENTITY CASCADE;
  `);
  await query(`
    TRUNCATE TABLE entities RESTART IDENTITY CASCADE;
  `);
};

module.exports = {
  createEntityTable,
  createAttributeTable,
  createValueTable,
  truncateTables,
  pool
};
