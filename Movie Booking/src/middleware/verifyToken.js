import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';


export const verifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) return res.status(401).json({ message: 'token not found...' });

        const token = authorization.split(" ")[1];

        const { userId } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await userModel.findOne({ _id: userId, isDeleted: false });

        if (!user) return res.status(404).json({ message: 'user not found...' });

        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export default verifyToken;