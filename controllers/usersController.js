const express = require("express");
const users = express.Router();
const {
  getAllUsers,
  getOneUser,
  createNewUser,
  deleteOneUser,
  editAllExistingUserData,
} = require("../queries/users");

const userAddressesController = require("./userAddressesController");
users.use("/:userId/addresses", userAddressesController);

const userShoppingCartItemController = require("./userShoppingCartItemController");
users.use("/:userId/cart", userShoppingCartItemController);

users.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: allUsers.message });
  }
});

users.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const oneUser = await getOneUser(userId);
    res.json(oneUser);
  } catch (err) {
    res.status(500).json({ error: oneUser.message });
  }
});

users.post("/", async (req, res) => {
  try {
    const newUserData = req.body;
    const newUser = await createNewUser(newUserData);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

users.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUserNewData = req.body;
    const editedUser = await editAllExistingUserData(
      userId,
      updatedUserNewData
    );
    res.status(200).json(editedUser);
  } catch (err) {
    res.status(500).json({ error: editedUser.message });
  }
});

users.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteOneUser(userId);
    if (deletedUser.user_id) res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: deletedUser.message });
  }
});

module.exports = users;
