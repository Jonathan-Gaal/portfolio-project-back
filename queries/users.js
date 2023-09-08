const db = require("../db/dbConfig");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (err) {
    return err;
  }
};

const getOneUser = async (userId) => {
  try {
    const singleUser = await db.one(
      "SELECT * FROM users WHERE user_id=$1",
      userId
    );
    return singleUser;
  } catch (err) {
    return err;
  }
};

const createNewUser = async (newUserInfo) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (user_firstName, user_lastName, user_email, user_password) VALUES($1, $2, $3, $4) RETURNING *",
      [
        newUserInfo.user_firstName,
        newUserInfo.user_lastName,
        newUserInfo.user_email,
        newUserInfo.user_password,
      ]
    );
    return newUser;
  } catch (err) {
    return err;
  }
};

const editAllExistingUserData = async (userId, updatedUserNewData) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET user_firstName=$1, user_lastName=$2, user_email=$3, user_password=$4 WHERE user_id=$5 RETURNING *",
      [
        updatedUserNewData.user_firstName,
        updatedUserNewData.user_lastName,
        updatedUserNewData.user_email,
        updatedUserNewData.user_password,
        userId,
      ]
    );
    return updatedUser;
  } catch (err) {
    return err;
  }
};

const deleteOneUser = async (userId) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE user_id=$1 RETURNING *",
      userId
    );
    return deletedUser;
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  deleteOneUser,
  editAllExistingUserData,
};
