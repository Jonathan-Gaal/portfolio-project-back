const db = require("../db/dbConfig");

//db.any is used since the amount of reviews is not just ONE but is indeterminate
const getAllComments = async (song_id) => {
  try {
    const allComments = await db.any(
      "SELECT * FROM comments WHERE art_id=$1",
      song_id
    );
    return allComments;
  } catch (err) {
    return err;
  }
};

const getComment = async (id) => {
  try {
    const oneComment = await db.one("SELECT * FROM comments WHERE id=$1", id);
    return oneComment;
  } catch (err) {
    return err;
  }
};

const createComment = async (comment) => {
  try {
    const newComment = await db.one(
      "INSERT INTO comments (commenter, comment, post_date, art_id) VALUES($1,$2,$3,$4) RETURNING *",
      [comment.commenter, comment.comment, comment.post_date, comment.art_id]
    );
    return newComment;
  } catch (err) {
    return err;
  }
};

const deleteComment = async (id) => {
  try {
    const deletedComment = await db.one(
      "DELETE FROM comments WHERE id=$1 RETURNING *",
      id
    );
    return deletedComment;
  } catch (err) {
    return err;
  }
};

const updateComment = async (id, comment) => {
  try {
    const updatedComment = await db.one(
      "UPDATE comments SET commenter=$1, comment=$2, post_date=$3 WHERE id=$4 RETURNING *",
      [comment.commenter, comment.comment, comment.post_date, id]
    );
    return updatedComment;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllComments,
  updateComment,
  createComment,
  deleteComment,
  getComment,
};
