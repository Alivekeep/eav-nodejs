require("dotenv").config();

const { truncateTables, pool } = require("../lib/utils/actions/tables");

(async () => {
  try {
    await truncateTables();

    // close connection
    await pool.end();
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
})();
