const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  addCloseFriend,
  unfollowUser,
  removeCloseFriend,
  sendRequest,
  getAllUsers,
} = require("../controllers/user.controllers.js");
const User = require("../models/User.js");
const {
  authMiddleware,
  isAdmin,
} = require("../middlewares/auth.middlewares.js");

router.get("/", getAllUsers); // Récupérer tous les utilisateurs
router.get("/:id", getUser); // Récupérer un utilisateur par son ID
router.put("/:id", updateUser); // Mettre à jour un utilisateur (protégé par auth)
router.delete("/:id", deleteUser); // Supprimer un utilisateur (protégé par auth)
router.put("/:id/follow", followUser); // Suivre un utilisateur (protégé par auth)
router.put("/:id/unfollow", unfollowUser); // Ne plus suivre un utilisateur (protégé par auth)
router.put("/:id/addclosefriend", addCloseFriend); // Ajouter un ami proche (protégé par auth)
router.put("/:id/removeCloseFriend", removeCloseFriend); // Supprimer un ami proche (protégé par auth)
module.exports = router; // Export direct
