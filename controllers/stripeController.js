const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    /*
        type of events
        charge.succeeded
        payment_intent.succeeded
        payment_intent.created
        checkout.session.completed
    */

    const typeOfEvent = req.body.type;
    console.log(typeOfEvent);

    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
});

module.exports = router;
