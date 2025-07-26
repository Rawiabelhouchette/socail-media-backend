const express = require("express");
const router = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  editCommentPost,
  deleteCommentPost,
  getAllPost,
  getMyPost,
  getAllPostAndGifts,
} = require("../controllers/post.controllers");

// Routes pour les posts
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/likepost/:id", likePost);
router.get("/", getAllPost);
router.get("/postsGifts", getAllPostAndGifts);
// Routes pour les commentaires
router.patch("/commentpost/:id", commentPost);
router.patch("/editcommentpost/:id", editCommentPost);
router.patch("/deletecommentpost/:id", deleteCommentPost);

router.get("/my-posts/:userId", getMyPost);

// router.patch("/sharepost/:id", sharePost); // Nouvelle route pour partager un post

module.exports = router;
