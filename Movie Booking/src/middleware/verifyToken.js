import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ success: false, message: 'Token not found. Please login.' });
        }

        // Check if it's a Bearer token
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Invalid Token format' });
        }

        // Matched with your .env key: JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ _id: decoded.userId, isDeleted: false });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found or deleted' });
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({ 
            success: false, 
            message: "Authentication failed", 
            error: error.message 
        });
    }
};

export default verifyToken;