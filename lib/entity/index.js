const models = require("../../data/models");
const {
  insertEntity,
  getById,
  getAllEntities,
  updateEntity,
  deleteEntity
} = require("../utils/actions/entity");
const {
  insertAttribute,
  removeAttributes
} = require("../utils/actions/attribute");
const { insertValue } = require("../utils/actions/value");

/**
 * @namespace Entity
 */
class Entity {
  /**
   *
   * @param name {String=} entity name
   * @param params {Object=} attributes with values
   */
  constructor(name, params) {
    if (name) {
      const modelName = models[name.toLowerCase()];

      if (typeof modelName === "undefined")
        throw new Error("Entity not found!");

      this._entityName = name;
      this._params = params;
      this.relations = modelName.relations;
      this.attributes = modelName.attributes;

      for (const attr in this.attributes) {
        this[attr] = this._params[attr];
      }
    }
  }

  /**
   * @desc Input values validation
   * @return {Entity}
   */
  validate() {
    for (const attr in this.attributes) {
      if (this.attributes.hasOwnProperty(attr)) {
        if (
          this.attributes[attr].validation.required &&
          typeof this._params[attr] === "undefined"
        ) {
          throw new Error(`Validation error: '${attr}' is required`);
        }
      }
    }

    return this;
  }

  /**
   * @desc Saving new entity with attributes to DB
   * @return {Entity}
   */
  async save() {
    const protectedFields = [
      "_entityName",
      "_params",
      "relations",
      "data",
      "attributes"
    ];
    const fields = Object.keys(this).filter(
      key => !protectedFields.includes(key)
    );

    if (typeof this._params.id === "undefined") {
      const entityData = await insertEntity(this._entityName);
      const entityId = entityData.rows[0].id;

      for (const field of fields) {
        const attributeData = await insertAttribute(
          entityId,
          field,
          this.attributes[field].type
        );

        await insertValue(attributeData.rows[0].id, this[field]);
      }
    } else {
      await updateEntity(this._params.id, this._entityName);
      await removeAttributes(this._params.id);

      for (const field of fields) {
        const attributeData = await insertAttribute(
          this._params.id,
          field,
          this.attributes[field].type
        );

        await insertValue(attributeData.rows[0].id, this[field]);
      }
    }

    return this;
  }

  /**
   * @desc Removing entity with relations
   * @param id {Number}
   * @return {Promise}
   */
  async destroy(id) {
    if (id) {
      this.id = id;
      await deleteEntity(id);
    }
  }

  /**
   * @desc Getting entity by id
   * @return {Promise}
   */
  async findById(id) {
    const { rows } = await getById(id);
    this.id = id;

    if (!rows.length) return null;

    const data = {
      entity: {
        id: rows[0]["entity_id"],
        name: rows[0]["entity_name"]
      },
      values: rows.map(row => ({
        id: row["attribute_id"],
        value: row["value"],
        attribute: {
          id: row["attribute_id"],
          name: row["attribute_name"],
          type: row["data_type"]
        }
      }))
    };

    this.data = data;

    return data;
  }

  /**
   * @desc Getting all nested entities
   * @return {Promise}
   */
  async findAll() {
    const { rows } = await getAllEntities();

    const groupedRows = {};

    rows.forEach(row => {
      if (!Array.isArray(groupedRows[row.entity_id])) {
        groupedRows[row.entity_id] = [row];
      } else {
        groupedRows[row.entity_id].push(row);
      }
    });

    const returningValues = [];

    Object.keys(groupedRows).forEach(key => {
      const data = groupedRows[key];
      const values = data.map(row => ({
        id: row["attribute_id"],
        value: row["value"],
        attribute: {
          id: row["attribute_id"],
          name: row["attribute_name"],
          type: row["data_type"]
        }
      }));

      returningValues.push({
        entity: {
          id: data[0]["entity_id"],
          name: data[0]["entity_name"]
        },
        values
      });
    });

    return returningValues;
  }
}

module.exports = Entity;
module.exports.Entity = Entity;
