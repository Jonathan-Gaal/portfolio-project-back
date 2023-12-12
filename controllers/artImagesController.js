const express = require("express");
const artImages = express.Router({ mergeParams: true });
const {
  getAllArtResourceImages,
  updateSingleArtResourceImage,
  createNewArtResourceImage,
  deleteSingleArtResourceImage,
  getSingleArtResourceImage,

  // getAllArtImages,
  // getSingleArtImage,
  // createNewArtImage,
  // updateSingleArtImage,
  // deleteSingleArtImage,
} = require("../queries/artImages");

//Index
artImages.get("/", async (req, res) => {
  const { artId } = req.params;
  try {
    const allArtImages = await getAllArtResourceImages(artId);
    res.status(200).json(allArtImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//CREATE
artImages.post("/", async (req, res) => {
  const newArtImageBody = req.body;
  try {
    const newArtImage = await createNewArtResourceImage(newArtImageBody);
    res.status(200).json(newArtImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//SHOW
artImages.get("/:imageId", async (req, res) => {
  const { imageId } = req.params;
  const artImage = await getSingleArtResourceImage(imageId);
  if (!artImage.message) {
    res.status(200).json(artImage);
  } else {
    res.status(400).json({ error: err.message });
  }
});

//UPDATE
artImages.put("/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;
    const newImageUrl = req.body;
    const updatedSingleArtImage = await updateSingleArtResourceImage(
      imageId,
      newImageUrl
    );
    console.log("updated image from put", updatedSingleArtImage);
    res.status(200).json(updatedSingleArtImage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//DELETE
artImages.delete("/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;
    const deletedSingleArtImage = await deleteSingleArtResourceImage(imageId);
    if (deletedSingleArtImage.image_id) {
      res.status(200).json(deletedSingleArtImage);
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

//Export
module.exports = artImages;
