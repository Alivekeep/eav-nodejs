const { defaultType, types } = require("../utils/enums/attribute-types");
const { BaseModel } = require("./base-model");

/**
 * @namespace Model
 */
class Model extends BaseModel {
  constructor() {
    super();
    this._type = defaultType;
    this.attributes = {};
  }

  /**
   *
   * @param type {String}
   * @param name {String}
   * @return {Model}
   */
  define(type, name) {
    this._modelType = type;
    this._modelName = name;

    if (this.checkType("attribute")) {
      this.attributes[name] = {
        type: this._type
      };
    } else if (this.checkType("entity")) {
      this.entity = name;
    }
    this.relations = {
      has: [],
      hasMany: []
    };

    return this;
  }

  /**
   *
   * @param validationObject
   * @return {Model}
   */
  validation(validationObject) {
    if (this.checkType("attribute")) {
      this.attributes[this._modelName].validation = validationObject;
    }
    return this;
  }

  /**
   *
   * @param type
   * @return {Model}
   */
  withType(type) {
    const isAllowed = types.some(item => type === item);
    if (this.checkType("attribute") && isAllowed) {
      this._type = type;
      this.attributes[this._modelName].type = type;
    }

    return this;
  }

  /**
   *
   * @param attribute
   * @return {Model}
   */
  has(attribute) {
    if (this.checkType("entity")) {
      this.relations.has = [...this.relations.has, attribute];
    }
    return this;
  }

  /**
   * @param attribute
   * @return {Model}
   */
  hasMany(attribute) {
    if (this.checkType("entity")) {
      this.relations.hasMany = [...this.relations.hasMany, attribute];
    }
    return this;
  }

  /**
   *
   * @return {{attributes: {}, entity: String}}
   */
  toObject() {
    return {
      entity: this.entity,
      attributes: this.attributes
    };
  }
}

module.exports = Model;
module.exports.Model = Model;
