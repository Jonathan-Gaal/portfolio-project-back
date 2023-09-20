const express = require("express");
const userShoppingCartItem = express.Router({
  mergeParams: true,
});

const {
  getAllUserShoppingCartItems,
  getOneUserShoppingCartItemById,
} = require("../queries/userShoppingCartItem");

// userShoppingCartItem.get("/", (req, res) => {
//   res.send("hello");
// });

userShoppingCartItem.get("/", async (req, res) => {
  try {
    const { userId } = req.params;
    const allShoppingCartItemsForOneUser = await getAllUserShoppingCartItems(
      userId
    );
    res.status(200).json(allShoppingCartItemsForOneUser);
  } catch (err) {
    res.status(500).json({ err: allShoppingCartItemsForOneUser.message });
  }
});

userShoppingCartItem.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID", id);
    const oneUserShoppingCartItemById = await getOneUserShoppingCartItemById(
      id
    );
    res.status(200).json(oneUserShoppingCartItemById);
  } catch (err) {
    status(500).json({ error: oneUserShoppingCartItemByItemId.message });
  }
});

module.exports = userShoppingCartItem;
