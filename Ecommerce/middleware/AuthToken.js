const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.verifyToken = async (req, res, next) => {
    try {
        let authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ message: "Token not found" });
        }

        let token = authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        let user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token error", error: error.message });
    }
};
