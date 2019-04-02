const Koa = require("koa");
const path = require("path");
const bodyParser = require("koa-bodyparser");

require("dotenv").config();

const routes = require("./routes");

const app = new Koa();

app.use(
  bodyParser({
    formLimit: "5mb",
    jsonLimit: "1mb",
    textLimit: "1mb"
  })
);

app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server was started!\nhttp://localhost:${process.env.SERVER_PORT}`
  );
});
