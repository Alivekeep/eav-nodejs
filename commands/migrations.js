require("dotenv").config();

const { readdir } = require("fs");
const path = require("path");
const { promisify } = require("util");
const { insertEntity, pool } = require("../lib/utils/actions/entity");
const { insertAttribute } = require("../lib/utils/actions/attribute");

const readDir = promisify(readdir);

(async () => {
  try {
    const models = {};

    const files = await readDir(`${__dirname}/../data/models/source`);

    files
      .filter(
        file =>
          file.indexOf(".") !== 0 &&
          file.slice(-3) === ".js" &&
          file !== "index.js"
      )
      .forEach(file => {
        const fileName = file.replace(".js", "");

        models[fileName] = require(path.join(
          __dirname,
          "/../data/models/source",
          file
        ));
      });

    for (const item in models) {
      if (models.hasOwnProperty(item)) {
        const model = models[item];

        const entity = await insertEntity(model.entity);
        const entityId = entity.rows[0].id;

        for (const attr in model.attributes) {
          if (model.attributes.hasOwnProperty(attr)) {
            await insertAttribute(entityId, attr, model.attributes[attr].type);
          }
        }
      }
    }

    // close connection
    await pool.end();
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
})();
