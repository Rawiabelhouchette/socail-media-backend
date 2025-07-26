require("dotenv").config();

const express = require("express");
const connect = require("./config/ConnectDB");
const app = express();
const mongoose = require("mongoose");

connect();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes (Vérifiez que chaque require() renvoie bien un routeur)
app.use("/api/auth", require("./routes/Auth.route"));
app.use("/api/user", require("./routes/user.route"));
app.use("/api/post", require("./routes/Post.route"));
app.use("/api/gift", require("./routes/gift.route"));
app.use("/image", require("./routes/image.router"));
app.use("/api/message", require("./routes/message.route"));
app.use("/api/notification", require("./routes/notification.route"));

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
