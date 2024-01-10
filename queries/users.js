const db = require("../db/dbConfig");

const getAllUsers = async () => {
  const allUsers = await db.any("SELECT * FROM users");
  return allUsers;
};

const getOneUser = async (userId) => {
  const singleUser = await db.one(
    "SELECT * FROM users WHERE user_id=$1",
    userId
  );
  return singleUser;
};

const createNewUser = async (newUserInfo) => {
  const newUser = await db.one(
    "INSERT INTO users (user_id, firstName, lastName, email) VALUES($1, $2, $3, $4) RETURNING *",
    [
      newUserInfo.user_id,
      newUserInfo.firstName,
      newUserInfo.lastName,
      newUserInfo.email,
    ]
  );
  return newUser;
};

const editAllExistingUserData = async (userId, updatedUserNewData) => {
  const updatedUser = await db.one(
    "UPDATE users SET user_firstName=$1, user_lastName=$2, user_email=$3, WHERE user_id=$4 RETURNING *",
    [
      updatedUserNewData.user_firstName,
      updatedUserNewData.user_lastName,
      updatedUserNewData.user_email,

      userId,
    ]
  );
  return updatedUser;
};

const deleteOneUser = async (userId) => {
  const deletedUser = await db.one(
    "DELETE FROM users WHERE user_id=$1 RETURNING *",
    userId
  );

  return deletedUser;
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  deleteOneUser,
  editAllExistingUserData,
};
