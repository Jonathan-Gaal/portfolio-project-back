const express = require("express");
const userAddresses = express.Router({ mergeParams: true });

const {
  getAllUserAddressesForOneUserByUserId,
  getOneUserAddressByAddressId,
  createNewUserAddress,
  updateExistingUserAddress,
} = require("../queries/userAddresses");

// userAddresses.get("/", (req, res) => {
//   res.send("hello");
// });

userAddresses.get("/", async (req, res) => {
  try {
    const { userId } = req.params;
    const allAddressesForOneUser = await getAllUserAddressesForOneUserByUserId(
      userId
    );
    res.status(200).json(allAddressesForOneUser);
  } catch (err) {
    res.status(500).json({ error: allAddressesForOneUser.message });
  }
});

userAddresses.get("/:userAddressId", async (req, res) => {
  try {
    const { userAddressId } = req.params;
    const oneUserAddressByAddressId = await getOneUserAddressByAddressId(
      userAddressId
    );
    res.status(200).json(oneUserAddressByAddressId);
  } catch (err) {
    res.status(500).json({ error: oneUserAddressByAddressId.message });
  }
});

userAddresses.post("/", async (req, res) => {
  try {
    const newUserAddressBody = req.body;
    const newUserAddress = await createNewUserAddress(newUserAddressBody);
    res.status(200).json(newUserAddress);
  } catch (err) {
    res.status(500).json({ error: newAddress.message });
  }
});

userAddresses.put("/:addressId", async (req, res) => {
  try {
    const { addressId } = req.params;
    const updatedAddressBody = req.body;
    const updatedUserAddress = await updateExistingUserAddress(
      updatedAddressBody,
      addressId
    );
    res.status(200).json(updatedUserAddress);
  } catch (err) {
    res.status(500).json({ error: updatedUserAddress.message });
  }
});

module.exports = userAddresses;
