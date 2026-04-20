const verifyRole = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Invalid Role" });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
};

module.exports = verifyRole;