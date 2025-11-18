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
    res.status(500).json({ error: err.message });
  }
});

users.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const oneUser = await getOneUser(userId);
    res.json(oneUser);
    console.log(oneUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
});

users.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteOneUser(userId);
    console.log("DELETED USER FROM CONTROLLER", deletedUser);
    if (deletedUser.user_id) res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = users;
