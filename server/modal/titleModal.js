// models/Language.js
const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema(
  {
    languageName: {
      type: String,
      required: true,
      trim: true,
    },
    languageContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Title", LanguageSchema);
