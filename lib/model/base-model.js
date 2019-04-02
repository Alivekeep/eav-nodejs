class BaseModel {
  checkType(type) {
    return this._modelType === type;
  }
}

module.exports = BaseModel;
module.exports.BaseModel = BaseModel;
