// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan");

const artController = require("./controllers/artController");
const userController = require("./controllers/usersController");

// CONFIGURATION

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// CONTROLLERS
app.use("/gallery", artController);
app.use("/users", userController);

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
