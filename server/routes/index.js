const Router = require("koa-router");

const { Entity } = require("../../lib/entity");

const router = new Router();

router.get("/", async ctx => {
  ctx.body = {};
});

router.post("/entity", async ctx => {
  try {
    const body = ctx.request.body;
    const entity = new Entity(body.entity, body.payload);

    entity.validate();
    entity.save();

    ctx.status = 201;
    ctx.body = {
      message: "Entity was created"
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      error: e.message
    };
  }
});

router.get("/entities", async ctx => {
  try {
    const entity = new Entity();
    const data = await entity.findAll();

    ctx.body = {
      data
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      error: e.message
    };
  }
});

router.get("/entity/:id", async ctx => {
  try {
    const { id } = ctx.params;
    const entity = new Entity();

    const data = await entity.findById(id);

    if (data !== null) {
      ctx.body = {
        data
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        message: "Entity not found"
      };
    }
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      error: e.message
    };
  }
});

router.put("/entity/:id", async ctx => {
  try {
    const { id } = ctx.params;
    const body = ctx.request.body;

    const preparedData = { ...body.payload, id };

    const entity = new Entity(body.entity, preparedData);

    entity.validate();
    entity.save();

    ctx.body = {
      message: "Entity was updated"
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      error: e.message
    };
  }
});

router.delete("/entity/:id", async ctx => {
  try {
    const { id } = ctx.params;

    const entity = new Entity();

    await entity.destroy(id);

    ctx.body = {
      message: "Entity was deleted"
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      error: e.message
    };
  }
});

module.exports = router.routes();
