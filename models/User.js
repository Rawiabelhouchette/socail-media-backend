const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Email invalide"],
    },
    password: {
      type: String,
      required: [true, "Please enter your Password"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères !"],
      select: false, // Add this to exclude password by default (optional but recommended)
    },
    dateDeNaiss: { type: Date },
    sexe: {
      type: String,
      enum: ["Homme", "Femme"],
    },
    avatar: {
      type: String,
      default: "path/to/default-avatar.jpg",
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    phone: { type: String },
    verifCode: { type: String },

    bio: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    closeFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Password hashing middleware
// Hash password before saving, only if it was modified or new
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed to save
  } catch (err) {
    next(err); // Pass error to Mongoose
  }
});

// Add a method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("users", userSchema);
