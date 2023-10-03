const db = require("../db/dbConfig");

const getAllUserAddressesForOneUserByUserId = async (userIdFromParams) => {
  const allUserAddressesFromOneUser = await db.any(
    "SELECT * FROM userAddresses WHERE user_id=$1",
    userIdFromParams
  );
  return allUserAddressesFromOneUser;
};

const getOneUserAddressByAddressId = async (addressIdFromParams) => {
  const oneUserAddressById = await db.one(
    "SELECT * FROM userAddresses WHERE id=$1",
    addressIdFromParams
  );
  return oneUserAddressById;
};

const createNewUserAddress = async (newUserAddressBody) => {
  const newUserAddress = await db.one(
    "INSERT INTO userAddresses (user_id, streetAddress, city, state, zip) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [
      newUserAddressBody.user_id,
      newUserAddressBody.streetAddress,
      newUserAddressBody.city,
      newUserAddressBody.state,
      newUserAddressBody.zip,
    ]
  );
  return newUserAddress;
};

const updateExistingUserAddress = async (
  updatedUserAddressBody,
  userAddressIdFromParams
) => {
  const updatedUserAddress = await db.one(
    "UPDATE userAddresses SET streetAddress=$1, city=$2, state=$3, zip=$4 WHERE id=$5 RETURNING*",
    [
      updatedUserAddressBody.streetAddress,
      updatedUserAddressBody.city,
      updatedUserAddressBody.state,
      updatedUserAddressBody.zip,
      userAddressIdFromParams,
    ]
  );
  return updatedUserAddress;
};

const deleteExistingUserAddress = async (addressIdFromParams) => {
  const deletedUserAddess = await db.one(
    "DELETE FROM userAddresses WHERE id=$1 RETURNING *",
    addressIdFromParams
  );
  return deletedUserAddess;
};

module.exports = {
  getAllUserAddressesForOneUserByUserId,
  getOneUserAddressByAddressId,
  createNewUserAddress,
  updateExistingUserAddress,
  deleteExistingUserAddress,
};
