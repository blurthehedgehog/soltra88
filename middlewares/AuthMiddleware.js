const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   const user = await User.findById(decoded.id); 
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    req.user = user;    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

module.exports = protect;