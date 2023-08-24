const pgp = require("pg-promise")();
require("dotenv").config();

const databaseUrl = process.env.PROD_DB;

const cn = {};

if (process.env.NODE_ENV === "production") {
  cn = {
    connectionString: databaseUrl,
  };
} else {
  cn = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  };
}

const db = pgp(cn);

module.exports = db;
