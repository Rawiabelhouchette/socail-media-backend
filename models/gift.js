const mongoose = require("mongoose");

const GiftSchema = new mongoose.Schema(
  {
    theme: String,
    category: {
      type: String,
      enum: ["Birthday", "Marriage", "Baby Shower", "Event", "Other"],
      required: [true, "Type is required"],
    },
    gifts: [
      {
        name: String,
        description: String,
      },
    ],
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
  },
  { timestamps: true }
);

const Gift = mongoose.model("gifts", GiftSchema);

module.exports = Gift;
