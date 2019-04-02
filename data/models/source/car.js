const { Model } = require("../../../lib/model");

const Car = new Model();

Car.define("attribute", "model").validation({ required: true });
Car.define("attribute", "manufacturer").validation({ required: true });
Car.define("attribute", "registrationDate").validation({ required: true });

Car.define("attribute", "price")
  .validation({ required: true })
  .withType("integer");

Car.define("entity", "Car")
  .has("model")
  .has("registrationDate")
  .has("manufacturer");

module.exports = Car;
