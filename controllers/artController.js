const express = require("express");
const { all } = require("../app");
const gallery = express.Router();
const {
  getAllArtwork,
  getOneArtwork,
  createArtwork,
  deleteArtwork,
  updateArtwork,
} = require("../queries/artwork");

const commentsController = require("./commentsController");
gallery.use("/:artId/comments", commentsController);

// INDEX/GALLERY
gallery.get("/", async (req, res) => {
  const allArtWork = await getAllArtwork();
  if (allArtwork[0]) {
    res.status(200).json(allArtwork);
  } else {
    res.status(500).json({ error: allArtWork.message });
  }
});

// GET ONE ARTWORK
gallery.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getOneArtwork(id);
  if (!artwork.message) {
    res.json(artwork);
  } else {
    res.status(404).json({ error: artwork.message });
  }
});

gallery.post("/", async (req, res) => {
  try {
    const artwork = await createArtwork(req.body);
    res.json(artwork);
  } catch (err) {
    res.status(400).json({ error: artwork.message });
  }
});

gallery.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArtwork = await deleteArtwork(id);
    if (deletedArtwork.id) {
      res.status(200).json(deletedArtwork);
    }
  } catch (err) {
    res.status(404).json({ error: deleteArtwork.message });
  }
});

gallery.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedArtwork = await updateArtwork(id, req.body);
    res.status(200).json(updatedArtwork);
  } catch (err) {
    res.status(404).json({ error: updateArtwork.message });
  }
});

module.exports = gallery;
