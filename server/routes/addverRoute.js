const express = require("express");
const router = express.Router();
const controller = require("../controller/adverController");
const upload = require("../middleware/multer"); // path to multer.diskStorage config

// Routes
router.post("/", upload.single("media"), controller.createAd);
router.get("/media", controller.getMedia);
router.delete("/delete/:id", controller.deleteMedia);

module.exports = router;