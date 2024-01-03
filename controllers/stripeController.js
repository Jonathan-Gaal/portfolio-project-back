const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    console.log(req.body);
    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
});

module.exports = router;
