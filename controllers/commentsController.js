const express = require("express");
const comments = express.Router({ mergeParams: true });
const {
  getAllComments,
  updateComment,
  createComment,
  deleteComment,
  getComment,
} = require("../queries/comments");

//INDEX
comments.get("/", async (req, res) => {
  const { artId } = req.params;
  try {
    const allComments = await getAllComments(artId);
    res.status(200).json(allComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//SHOW
comments.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await getComment(id);
    if (!comment.message) {
      res.status(200).json(comment);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//CREATE
comments.post("/", async (req, res) => {
  const newCommentBody = req.body;
  try {
    const comment = await createComment(newCommentBody);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//UPDATE
comments.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await updateComment(id, req.body);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

//DELETE
comments.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await deleteComment(id);
    if (deletedComment.id) {
      res.status(200).json(deletedComment);
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = comments;
