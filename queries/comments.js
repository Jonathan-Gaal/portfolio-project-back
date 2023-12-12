const db = require("../db/dbConfig");

//db.any is used since the amount of reviews is not just ONE but is indeterminate
const getAllComments = async (art_id) => {

    const allComments = await db.any(
      "SELECT * FROM comments WHERE art_id=$1",
      art_id
    );
    return allComments;

};

const getComment = async (id) => {

    const oneComment = await db.one("SELECT * FROM comments WHERE id=$1", id);
    return oneComment;

};

const createComment = async (comment) => {

    const newComment = await db.one(
      "INSERT INTO comments (commenter, comment, post_date, art_id) VALUES($1,$2,$3,$4) RETURNING *",
      [comment.commenter, comment.comment, comment.post_date, comment.art_id]
    );
    return newComment;

};

const deleteComment = async (id) => {
  
    const deletedComment = await db.one(
      "DELETE FROM comments WHERE id=$1 RETURNING *",
      id
    );
    return deletedComment;

};

const updateComment = async (id, comment) => {

    const updatedComment = await db.one(
      "UPDATE comments SET commenter=$1, comment=$2, post_date=$3 WHERE id=$4 RETURNING *",
      [comment.commenter, comment.comment, comment.post_date, id]
    );
    return updatedComment;

};

module.exports = {
  getAllComments,
  updateComment,
  createComment,
  deleteComment,
  getComment,
};
