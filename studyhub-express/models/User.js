const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["student", "instructor"], default: "student" },
    bio: { type: String, maxlength: 300, default: "" }
  },
  {
    timestamps: true
  }
);
// Unique index on email ensures no duplicate accounts
// select: false on passwordHash prevents accidental exposure in queries


module.exports = mongoose.model("User", userSchema);
