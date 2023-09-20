const express = require("express");
const userShoppingCartItem = express.Router({
  mergeParams: true,
});

const {
  getAllUserShoppingCartItems,
  getOneUserShoppingCartItemById,
  createNewUserShoppingCartItem,
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

userShoppingCartItem.post("/", async (req, res) => {
  try {
    const newUserShoppingCartItemBody = req.body;
    const newUserShoppingCartItem = await createNewUserShoppingCartItem(
      newUserShoppingCartItemBody
    );
    console.log("NEW ITEM", newUserShoppingCartItem);
    res.status(200).json(newUserShoppingCartItem);
  } catch (err) {
    res.status(500).json({ error: newUserShoppingCartItem.message });
  }
});

module.exports = userShoppingCartItem;
