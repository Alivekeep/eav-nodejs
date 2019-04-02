const { readdirSync } = require("fs");
const path = require("path");

const models = {};

// getting all models
readdirSync(`${__dirname}/source`)
  .filter(
    file =>
      file.indexOf(".") !== 0 && file.slice(-3) === ".js" && file !== "index.js"
  )
  .forEach(file => {
    const fileName = file.replace(".js", "");

    models[fileName] = require(path.join(__dirname, 'source', file));
  });

module.exports = models;
