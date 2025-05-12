const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Database connection (replace with actual configuration)
const db = require("./config/dbConn");
db();

// Import routes
const userRoute = require("./routes/userRoute");
const languageRoutes = require("./routes/languageRoutes");
const titleRoute = require("./routes/titleRoute");
const sectionRoute = require("./routes/sectionRoute");

// Static files
app.use(express.static(path.join(__dirname, "./sampleFileUpload")));

// Routes
app.use("/api/auth", userRoute);
app.use("/api/language", languageRoutes);
app.use("/api/title", titleRoute);
app.use("/api/section", sectionRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
