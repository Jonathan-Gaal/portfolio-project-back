const db = require("../db/dbConfig");

const getAllUserAddressesForOneUserByUserId = async (userIdFromParams) => {
  try {
    const allUserAddressesFromOneUser = await db.any(
      "SELECT * FROM userAddresses WHERE user_address_user_id=$1",
      userIdFromParams
    );
    return allUserAddressesFromOneUser;
  } catch (err) {
    return err;
  }
};

const getOneUserAddressByAddressId = async (addressIdFromParams) => {
  try {
    const oneUserAddressById = await db.one(
      "SELECT * FROM userAddresses WHERE user_address_id=$1",
      addressIdFromParams
    );
    return oneUserAddressById;
  } catch (err) {
    return err;
  }
};

//  user_address_id SERIAL PRIMARY KEY,
//  user_address_user_id INTEGER NOT NULL,
//  FOREIGN KEY (user_address_user_id) REFERENCES users (user_id) ON DELETE CASCADE,
//  user_address_streetAddress VARCHAR(100) NOT NULL,
//  user_address_city VARCHAR(60) NOT NULL,
//  user_address_state VARCHAR(2) NOT NULL,
//  user_address_zip VARCHAR(5) NOT NULL

const createNewUserAddress = async (newUserAddressBody) => {
  try {
    const newUserAddress = await db.one(
      "INSERT INTO userAddresses (user_address_user_id, user_address_streetAddress, user_address_city, user_address_state, user_address_zip) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [
        newUserAddressBody.user_address_user_id,
        newUserAddressBody.user_address_streetAddress,
        newUserAddressBody.user_address_city,
        newUserAddressBody.user_address_state,
        newUserAddressBody.user_address_zip,
      ]
    );
    return newUserAddress;
  } catch (err) {
    return err;
  }
};

updateExistingUserAddress = async (
  updatedUserAddressBody,
  userAddressIdFromParams
) => {
  try {
    const updatedUserAddress = await db.one(
      "UPDATE userAddresses SET user_address_streetAddress=$1, user_address_city=$2, user_address_state=$3, user_address_zip=$4 WHERE user_address_user_id=$5 RETURNING*",
      [
        updatedUserAddressBody.user_address_streetAddress,
        updatedUserAddressBody.user_address_city,
        updatedUserAddressBody.user_address_state,
        updatedUserAddressBody.user_address_zip,
        userAddressIdFromParams,
      ]
    );
    return updatedUserAddress;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllUserAddressesForOneUserByUserId,
  getOneUserAddressByAddressId,
  createNewUserAddress,
  updateExistingUserAddress,
};
