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

module.exports = {
  getAllUserShoppingCartItems,
  getOneUserShoppingCartItemById,
};
