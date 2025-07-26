const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  testMail,
  verfMail,
  VerifCode,
} = require("../controllers/auth.controllers");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgotpassword", verfMail);
router.post("/verifCode", VerifCode);
router.put("/resetpassword", resetPassword);
router.post("/testmail", testMail);

module.exports = router;
