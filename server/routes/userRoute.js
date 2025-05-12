const express = require("express");
const {
  registerUser,
  loginUser,
  validateTokenController,
} = require("../controller/userController");
const upload = require("../middleware/multer"); // Import multer middleware
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

router.post("/validate-token", validateTokenController);

module.exports = router;
