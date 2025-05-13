const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Database connection (replace with actual configuration)
const db = require("./config/dbConn");
db();

// Import routes
const userRoute = require("./routes/userRoute");
const languageRoutes = require("./routes/languageRoutes");
const titleRoute = require("./routes/titleRoute");
const sectionRoute = require("./routes/sectionRoute");
const addverRoute = require("./routes/addverRoute");

// Static files
app.use(express.static(path.join(__dirname, "./sampleFileUpload")));

// Routes
app.use("/api/auth", userRoute);
app.use("/api/language", languageRoutes);
app.use("/api/title", titleRoute);
app.use("/api/section", sectionRoute);
app.use("/api/add", addverRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
