const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  selectedLanguageName: {
    type: String,
    required: true,
  },
  selectedTitle: {
    type: String,
    required: true,
  },
  contentText: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Content", contentSchema);
