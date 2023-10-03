const db = require("../db/dbConfig");

const getAllUserShoppingCartItems = async (userIdFromParams) => {
  const allShoppingCartItemsForOneUser = await db.any(
    "SELECT * FROM userShoppingCartItem WHERE user_id=$1",
    userIdFromParams
  );
  return allShoppingCartItemsForOneUser;
};

const getOneUserShoppingCartItemById = async (idFromParams) => {
  const oneUserShoppingCartItemById = await db.one(
    "SELECT * FROM userShoppingCartItem WHERE id=$1",
    idFromParams
  );
  return oneUserShoppingCartItemById;
};

const createNewUserShoppingCartItem = async (newUserShoppingCartItemBody) => {
  const newUserShoppingCartItem = await db.one(
    "INSERT INTO userShoppingCartItem (item_id, user_id) VALUES($1,$2) RETURNING *",
    [newUserShoppingCartItemBody.item_id, newUserShoppingCartItemBody.user_id]
  );
  return newUserShoppingCartItem;
};

const updateExistingUserShoppingCartItem = async (
  updatedUserShoppingCartItemBody,
  userShoppingCartItemIdFromParams
) => {
  const updatedUserShoppingCartItem = await db.one(
    "UPDATE userShoppingCartItem SET item_id=$1, user_id=$2 WHERE id=$3 RETURNING *",
    [
      updatedUserShoppingCartItemBody.item_id,
      updatedUserShoppingCartItemBody.user_id,
      userShoppingCartItemIdFromParams,
    ]
  );
  return updatedUserShoppingCartItem;
};

const deleteExistingUserShoppingCartItem = async (
  userShoppingCartItemIdFromParams
) => {
  const deletedShoppingCartItem = await db.one(
    "DELETE FROM userShoppingCartItem WHERE id=$1 RETURNING *",
    userShoppingCartItemIdFromParams
  );
  return deletedShoppingCartItem;
};

module.exports = {
  getAllUserShoppingCartItems,
  getOneUserShoppingCartItemById,
  createNewUserShoppingCartItem,
  updateExistingUserShoppingCartItem,
  deleteExistingUserShoppingCartItem,
};
