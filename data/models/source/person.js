const { Model } = require("../../../lib");

const Person = new Model();

Person.define("attribute", "firstName").validation({ required: true });
Person.define("attribute", "lastName").validation({ required: true });
Person.define("attribute", "email").validation({});
Person.define("attribute", "age")
  .validation({ min: 1, max: 120 })
  .withType("integer");

Person.define("entity", "Person")
  .has("firstName")
  .has("age")
  .hasMany("email")
  .has("lastName");

module.exports = Person;
