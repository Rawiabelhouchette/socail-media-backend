const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Birthday", "Marriage", "Baby Shower", "Event", "Other"],
      required: true,
    },
    reported: {
      type: Boolean,
      default: false,
    },
    caption: {
      type: String,
      maxlength: 500,
    },
    picture: {
      type: String,
      default: "",
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    likers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        commenterId: { type: String, required: true },
        commenterName: { type: String, required: true },
        image: { type: String, required: true },
        text: { type: String, required: true },
        timestamp: { type: Number, default: Date.now },
      },
    ],
    shares: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
