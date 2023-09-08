const express = require("express");
const userAddresses = express.Router({ mergeParams: true });

userAddresses.get("/", async (req, res) => {
  res.send("hello");
});

module.exports = userAddresses;
