const db = require("../db/dbConfig");

//db.any is used since the amount of reviews is not just ONE but is indeterminate
const getAllArtResourceImages = async (artIdFromParams) => {
  try {
    const allArtResourceImages = await db.any(
      "SELECT * FROM galleryArtImages WHERE art_id=$1",
      artIdFromParams
    );
    return allArtResourceImages;
  } catch (err) {
    return err;
  }
};

const getSingleArtResourceImage = async (imageIdFromParams) => {
  try {
    const singleArtResourceImage = await db.one(
      "SELECT * FROM galleryArtImages WHERE image_id=$1",
      imageIdFromParams
    );
    return singleArtResourceImage;
  } catch (err) {
    return err;
  }
};

const createNewArtResourceImage = async (newArtResourceImage) => {
  try {
    const newArtImage = await db.one(
      "INSERT INTO galleryArtImages (image_url, image_caption, art_id) VALUES($1,$2,$3) RETURNING *",
      [
        newArtResourceImage.image_url,
        newArtResourceImage.image_caption,
        newArtResourceImage.art_id,
      ]
    );
    return newArtImage;
  } catch (err) {
    return err;
  }
};

const deleteSingleArtResourceImage = async (imageIdFromParams) => {
  try {
    const deletedSingleArtResourceImage = await db.one(
      "DELETE FROM galleryArtImages WHERE image_id=$1 RETURNING *",
      imageIdFromParams
    );
    return deletedSingleArtResourceImage;
  } catch (err) {
    return err;
  }
};

const updateSingleArtResourceImage = async (imageIdFromParams, newImageUrl) => {
  try {
    const updatedSingleArtResource = await db.one(
      "UPDATE galleryArtImages SET image_url=$1, image_caption=$2 WHERE image_id=$3 RETURNING *",
      [newImageUrl.image_url, newImageUrl.image_caption, imageIdFromParams]
    );
    return updatedSingleArtResource;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllArtResourceImages,
  updateSingleArtResourceImage,
  createNewArtResourceImage,
  deleteSingleArtResourceImage,
  getSingleArtResourceImage,
};
