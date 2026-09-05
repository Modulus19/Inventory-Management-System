const jwt = require("jsonwebtoken");

//Middleware to verify JWT token
exports.protect = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // Get the token from the Authorization header

  if (!token) {
    return res
      .status(401)
      .json({ message: "NOT AUTHOURIZED: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "NOT AUTHOURIZED: Invalid token" });
  }
};
