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
      "INSERT INTO gallery (title, materials, description, category, post_date, image, diameter_inches, width_inches, height_inches, depth_inches) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING *",
      [
        artwork.title,
        artwork.materials,
        artwork.description,
        artwork.category,
        artwork.post_date,
        artwork.image,
        artwork.length_inches,
        artwork.width_inches,
        artwork.height_inches,
        artwork.depth_inches,
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
      "UPDATE gallery SET title=$1, materials=$2, description=$3, category=$4, post_date=$5, image=$6, diameter_inches=$7, width_inches=$8, height_inches=$9, depth_inches=$10 WHERE id=$11 RETURNING *",
      [
        artwork.title,
        artwork.materials,
        artwork.description,
        artwork.category,
        artwork.post_date,
        artwork.image,
        artwork.length_inches,
        artwork.width_inches,
        artwork.height_inches,
        artwork.depth_inches,
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
