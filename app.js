// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan");

const artController = require("./controllers/artController");

// CONFIGURATION

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/gallery", artController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Jons Art");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
