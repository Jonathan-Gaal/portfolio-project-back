const db = require("../db/dbConfig");

const getAllArtwork = async () => {
  const allArtwork = await db.any("SELECT * FROM gallery");
  return allArtwork;
};

const getOneArtwork = async (id) => {
  const oneArtwork = await db.one("SELECT * FROM gallery WHERE id=$1", id);
  return oneArtwork;
};

const createArtwork = async (artwork) => {
  const newArtwork = await db.one(
    "INSERT INTO gallery (title, materials, description, category, post_date, image, diameter, width, height, depth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ) RETURNING *",
    [
      artwork.title,
      artwork.materials,
      artwork.description,
      artwork.category,
      artwork.post_date,
      artwork.image,
      artwork.diameter,
      artwork.width,
      artwork.height,
      artwork.depth,
    ]
  );
  return newArtwork;
};

const deleteArtwork = async (id) => {
  const deletedArtwork = await db.one(
    "DELETE FROM gallery WHERE id=$1 RETURNING *",
    id
  );
  return deletedArtwork;
};

const updateArtwork = async (id, artwork) => {
  const updatedArtwork = await db.one(
    "UPDATE gallery SET title=$1, materials=$2, description=$3, category=$4, post_date=$5, image=$6, diameter=$7, width=$8, height=$9, depth=$10 WHERE id=$11 RETURNING *",
    [
      artwork.title,
      artwork.materials,
      artwork.description,
      artwork.category,
      artwork.post_date,
      artwork.image,
      artwork.diameter,
      artwork.width,
      artwork.height,
      artwork.depth,
      id,
    ]
  );
  return updatedArtwork;
};

module.exports = {
  getAllArtwork,
  getOneArtwork,
  createArtwork,
  deleteArtwork,
  updateArtwork,
};
