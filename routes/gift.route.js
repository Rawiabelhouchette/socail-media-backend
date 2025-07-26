const express = require("express");
const router = express.Router();

const {
  createlist,
  updatelist,
  deletelist,
  getGift,
  getGiftByUser,
} = require("../controllers/gift.controllers");

router.get("/", getGift);
router.get("/my-gifts/:userId", getGiftByUser);

router.post("/", createlist);
router.put("/:id", updatelist);
router.delete("/:id", deletelist);

module.exports = router;
