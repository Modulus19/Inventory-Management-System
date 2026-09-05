//Create authorization middleware to check if the user has the required role to access a specific route
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "FORBIDDEN: Insufficient permissions" });
    }
    next();
  };
};
