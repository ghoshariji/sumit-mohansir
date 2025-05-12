const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    programmingLanguage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Language", languageSchema);
