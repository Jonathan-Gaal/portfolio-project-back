const db = require("../db/dbConfig");

//db.any is used since the amount of reviews is not just ONE but is indeterminate
const getAllArtResourceImages = async (artIdFromParams) => {
  const allArtResourceImages = await db.any(
    "SELECT * FROM galleryArtImages WHERE art_id=$1",
    artIdFromParams
  );
  return allArtResourceImages;
};

const getSingleArtResourceImage = async (imageIdFromParams) => {
  const singleArtResourceImage = await db.one(
    "SELECT * FROM galleryArtImages WHERE image_id=$1",
    imageIdFromParams
  );
  return singleArtResourceImage;
};

const createNewArtResourceImage = async (newArtResourceImage) => {
  const newArtImage = await db.one(
    "INSERT INTO galleryArtImages (image_url, image_caption, art_id) VALUES($1,$2,$3) RETURNING *",
    [
      newArtResourceImage.image_url,
      newArtResourceImage.image_caption,
      newArtResourceImage.art_id,
    ]
  );
  return newArtImage;
};

const deleteSingleArtResourceImage = async (imageIdFromParams) => {
  const deletedSingleArtResourceImage = await db.one(
    "DELETE FROM galleryArtImages WHERE image_id=$1 RETURNING *",
    imageIdFromParams
  );
  return deletedSingleArtResourceImage;
};

const updateSingleArtResourceImage = async (imageIdFromParams, newImageUrl) => {
  const updatedSingleArtResource = await db.one(
    "UPDATE galleryArtImages SET image_url=$1, image_caption=$2 WHERE image_id=$3 RETURNING *",
    [newImageUrl.image_url, newImageUrl.image_caption, imageIdFromParams]
  );
  return updatedSingleArtResource;
};

module.exports = {
  getAllArtResourceImages,
  updateSingleArtResourceImage,
  createNewArtResourceImage,
  deleteSingleArtResourceImage,
  getSingleArtResourceImage,
};
