const express = require("express");
const gallery = express.Router();
const {
  getAllArtwork,
  getOneArtwork,
  createArtwork,
  deleteArtwork,
  updateArtwork,
} = require("../queries/gallery");

const commentsController = require("./commentsController");
gallery.use("/:artId/comments", commentsController);

const artImagesController = require("./artImagesController");
gallery.use("/:artId/artImages", artImagesController);

// INDEX/GALLERY
gallery.get("/", async (req, res) => {
  const allArtwork = await getAllArtwork();
  if (allArtwork[0]) {
    res.status(200).json(allArtwork);
  } else {
    res.status(500).json({ error: err.message });
  }
});

// GET ONE ARTWORK
gallery.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const artwork = await getOneArtwork(id);
    if (artwork) {
      res.status(200).json(artwork);
    } else {
      res.status(404).json({ error: `Resource with id: ${id} not found` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

gallery.post("/", async (req, res) => {
  try {
    const artwork = await createArtwork(req.body);
    res.json(artwork);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

gallery.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArtwork = await deleteArtwork(id);
    if (deletedArtwork) {
      res.status(200).json(deletedArtwork);
    } else {
      res.status(404).json({
        error: `Cannot delete resource with id: ${id} - resource not found`,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

gallery.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedArtworkNewData = req.body;
    const updatedArtwork = await updateArtwork(id, updatedArtworkNewData);

    if (updatedArtwork) {
      res.status(200).json(updatedArtwork);
    } else {
      res.status(404).json({
        error: `Cannot update resource with id: ${id} - resource not found`,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = gallery;
