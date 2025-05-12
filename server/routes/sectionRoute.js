const express = require("express");
const router = express.Router();
const contentController = require("../controller/sectionController");

router.post("/content", contentController.createContent);
router.get("/content", contentController.getAllContent);
router.get("/content/by-language/:language/:title", contentController.getContentByLanguageAndTitle);
router.get("/language", contentController.getLanguages);
router.get("/title/:language", contentController.getTitlesByLanguage);

module.exports = router;
