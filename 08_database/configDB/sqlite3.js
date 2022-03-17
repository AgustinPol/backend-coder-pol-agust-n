const path = require("path");

const sqlite = {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "../db/ecommerce.sqlite")
    },
    useNullAsDefault: true
  }

module.exports = { sqlite }