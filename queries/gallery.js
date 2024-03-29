const db = require("../db/dbConfig");

const getAllArtwork = async () => {
  const allArtwork = await db.any("SELECT * FROM gallery");
  return allArtwork;
};

const getOneArtwork = async (id) => {
  const oneArtwork = await db.oneOrNone(
    "SELECT * FROM gallery WHERE id=$1",
    id
  );
  return oneArtwork;
};

const createArtwork = async (artwork) => {
  const newArtwork = await db.one(
    "INSERT INTO gallery (title, materials, description, category, creation_date, post_date, diameter, width, height, depth, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10. $11 ) RETURNING *",
    [
      artwork.title,
      artwork.materials,
      artwork.description,
      artwork.category,
      artwork.creation_date,
      artwork.post_date,
      artwork.diameter,
      artwork.width,
      artwork.height,
      artwork.depth,
      artwork.price,
    ]
  );
  return newArtwork;
};

const deleteArtwork = async (id) => {
  const deletedArtwork = await db.oneOrNone(
    "DELETE FROM gallery WHERE id=$1 RETURNING *",
    id
  );
  return deletedArtwork;
};

const updateArtwork = async (id, artwork) => {
  const updatedArtwork = await db.oneOrNone(
    "UPDATE gallery SET title=$1, materials=$2, description=$3, category=$4, creation_date=$5, post_date=$6, diameter=$7, width=$8, height=$9, depth=$10, price=$11 WHERE id=$12 RETURNING *",
    [
      artwork.title,
      artwork.materials,
      artwork.description,
      artwork.category,
      artwork.creation_date,
      artwork.post_date,
      artwork.diameter,
      artwork.width,
      artwork.height,
      artwork.depth,
      artwork.price,
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
