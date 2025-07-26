// middlewares/auth.middleware.js

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET doit être défini dans .env
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Token invalide." });
  }
};
