const db = require("../db/dbConfig");

const getAllArtwork = async () => {
  try {
    const allArtwork = await db.any("SELECT * FROM gallery");
    return allArtwork;
  } catch (err) {
    return err;
  }
};

const getOneArtwork = async (id) => {
  try {
    const oneArtwork = await db.one("SELECT * FROM gallery WHERE ID=$1", id);
    return oneArtwork;
  } catch (err) {
    return err;
  }
};

const createArtwork = async (artwork) => {
  try {
    const newArtwork = await db.one(
      "INSERT INTO gallery (title, materials, description, category, post_date, image, length, width, height, depth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING *",
      [
        artwork.title,
        artwork.materials,
        artwork.description,
        artwork.category,
        artwork.post_date,
        artwork.image,
        artwork.length,
        artwork.width,
        artwork.height,
        artwork.depth,
      ]
    );
    return newArtwork;
  } catch (err) {
    return err;
  }
};

const deleteArtwork = async (id) => {
  try {
    const deletedArtwork = await db.one(
      "DELETE FROM gallery WHERE id = $1 RETURNING *",
      id
    );
    return deletedArtwork;
  } catch (err) {
    return err;
  }
};

const updateArtwork = async (id, artwork) => {
  try {
    const updatedArtwork = await db.one(
      "UPDATE gallery SET title=$1, materials=$2, description=$3, category=$4, post_date=$5, image=$6, length=$7, width=$8, height=$9, depth=$10 WHERE id=$11 RETURNING *",
      [
        artwork.title,
        artwork.materials,
        artwork.description,
        artwork.category,
        artwork.post_date,
        artwork.image,
        artwork.length,
        artwork.width,
        artwork.height,
        artwork.depth,
        id,
      ]
    );
    return updatedArtwork;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllArtwork,
  getOneArtwork,
  createArtwork,
  deleteArtwork,
  updateArtwork,
};
