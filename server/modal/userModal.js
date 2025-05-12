const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
    },
    passingYear: {
      type: Number,
      required: true,
    },
    interestedLanguages: {
      type: [String],
      required: true,
    },
    userType: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserData", userSchema);
