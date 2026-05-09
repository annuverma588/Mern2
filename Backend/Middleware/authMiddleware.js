const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 PROTECTED ROUTE MIDDLEWARE
// यह middleware check करता है कि user का valid JWT token है या नहीं
const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ STEP 1: Token को headers से निकालो
    // Format: "Authorization: Bearer <token>"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("✅ Token found in headers");
    }

    // ❌ अगर token नहीं है तो error
    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // ✅ STEP 2: Token को verify करो
    // JWT_SECRET से check करता है कि token valid है या नहीं
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified, decoded:", decoded);

    // ❌ अगर token में id नहीं है
    if (!decoded.id) {
      console.log("❌ Invalid token payload - no id");
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // ✅ STEP 3: Database से user को ढूंढो
    const user = await User.findById(decoded.id);

    // ❌ अगर user database में नहीं है
    if (!user) {
      console.log("❌ User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ STEP 4: User को request में attach करो
    // अब हर route में req.user available होगा
    req.user = user;
    console.log("✅ User authenticated:", user.email);

    next();
  } catch (error) {
    // Token related errors
    if (error.name === "TokenExpiredError") {
      console.log("❌ Token expired");
      return res.status(401).json({ message: "Token expired, please login again" });
    }

    if (error.name === "JsonWebTokenError") {
      console.log("❌ Invalid token:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    console.error("❌ Auth error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};



module.exports = { protect , admin};