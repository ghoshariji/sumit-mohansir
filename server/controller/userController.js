const User = require("../modal/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      class: userClass,
      collegeName,
      passingYear,
      interestedLanguages,
      userType,
    } = req.body;

    // Validate required fields
    if (
      !name || !email || !password || !userClass || !collegeName ||
      !passingYear || !interestedLanguages || !Array.isArray(interestedLanguages)
    ) {
      return res.status(400).json({ message: "All fields are required and valid" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" }); // 409 Conflict
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      class: userClass,
      collegeName,
      passingYear,
      interestedLanguages,
      userType: userType === 'admin' ? 'admin' : 'user', // enforce valid values
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Other server errors
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.validateTokenController = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token payload" });
    }

    // Check for User
    const user = await User.findById(userId).select(
      "-password -__v -profileImage"
    );
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User validated successfully",
        user,
      });
    }

    // Check for Milkman
    const milkman = await MilkmanModel.findById(userId)
      .select("-password -__v -profileImage")
      .populate("customer", "name enterCode phone") // Populate customer details
      .populate("seller", "name enterCode phone");
    if (milkman) {
      return res.status(200).json({
        success: true,
        message: "Milkman validated successfully",
        user: milkman,
      });
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
