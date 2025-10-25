const jwt = require("jsonwebtoken");
const User = require("../Model/userLogin.js");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "No user found with this email" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.jwt_token, 
      { expiresIn: "30m" }
    );

    req.user = user;
    req.token = token;
    next(); 

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

global.loggedInUsers = global.loggedInUsers || {};

exports.getlogindata = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token || !global.loggedInUsers[token]) {
    return res.status(401).json({ error: "Unauthorized or token missing" });
  }

  const userId = global.loggedInUsers[token];

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = {
      userId: user._id,
      designation: user.designation,
      email: user.email,
      name: user.name,
    };
    next();
  } catch (err) {
    console.error("Error fetching user from token:", err);
    return res.status(500).json({ error: "Server error" });
  }
};