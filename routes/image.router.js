const express = require("express");
const router = express.Router();
const Image = require("../models/image");

const upload = require("../middlewares/multerConfig");
const image = require("../models/image");

router.post("/upload", upload().single("image"), (req, res) => {
  try {
    const imageUrl = `/uploads/${req.file.filename}`;
    console.log(imageUrl);
    const newImage = new Image({ url: imageUrl });
    newImage.save();
    res.status(200).json({ ms: "file saved", newImage });
  } catch (error) {
    res.status(500).json({ ms: "file not saved" });
    console.log(error);
  }
});
module.exports = router;
