const db = require("../db/dbConfig");

const getAllUserShoppingCartItems = async (userIdFromParams) => {
  try {
    const allShoppingCartItemsForOneUser = await db.any(
      "SELECT * FROM userShoppingCartItem WHERE user_id=$1",
      userIdFromParams
    );
    return allShoppingCartItemsForOneUser;
  } catch (err) {
    return err;
  }
};

const getOneUserShoppingCartItemById = async (idFromParams) => {
  try {
    const oneUserShoppingCartItemById = await db.one(
      "SELECT * FROM userShoppingCartItem WHERE id=$1",
      idFromParams
    );
    return oneUserShoppingCartItemById;
  } catch (err) {
    return err;
  }
};

const createNewUserShoppingCartItem = async (newUserShoppingCartItemBody) => {
  try {
    const newUserShoppingCartItem = await db.one(
      "INSERT INTO userShoppingCartItem (item_id, user_id) VALUES($1,$2) RETURNING *",
      [newUserShoppingCartItemBody.item_id, newUserShoppingCartItemBody.user_id]
    );
    return newUserShoppingCartItem;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllUserShoppingCartItems,
  getOneUserShoppingCartItemById,
  createNewUserShoppingCartItem,
};
