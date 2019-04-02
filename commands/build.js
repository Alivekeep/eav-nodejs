require("dotenv").config();

const {
  createEntityTable,
  createAttributeTable,
  createValueTable,
  pool
} = require("../lib/utils/actions/tables");

(async () => {
  try {
    //creating EAV schema in Postgres
    await createEntityTable();
    await createAttributeTable();
    await createValueTable();

    // close connection
    await pool.end();
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
})();
