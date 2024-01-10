// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const app = express();
const morgan = require("morgan");

const artController = require("./controllers/artController");
const userController = require("./controllers/usersController");
// TODO: can use this webhook to send a payment confirmation email from stripe to user or myself
const stripeController = require("./controllers/stripeController");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);

// CONFIGURATION

// MIDDLEWARE
app.use(cors({}));
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("tiny"));
// CONTROLLERS
app.use("/gallery", artController);
app.use("/users", userController);
app.use("/stripe", stripeController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Jons Art");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.post("/create-checkout-session", async (req, res) => {
  const requestBodyItems = req.body.items;

  let lineItems = [];

  for (const item of requestBodyItems) {
    const product = await stripe.products.create({
      name: "test product",
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Number(item.item_price * 100),
      currency: "usd",
    });

    lineItems.push({ price: price.id, quantity: item.quantity });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.REACT_APP_URL}/success`,
    cancel_url: `${process.env.REACT_APP_URL}/cancel`,
  });
  // res.send(session.url);

  // return session;

  res.send(session);
});

// EXPORT
module.exports = app;
