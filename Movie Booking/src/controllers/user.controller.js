import { userModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 1. Register User
export const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        let user = await userModel.findOne({ email, isDeleted: false });
        if (user) return res.status(400).json({ success: false, message: 'User already exists...' });

        const hashPassword = await bcrypt.hash(password, 10);
        let newUser = await userModel.create({ ...req.body, password: hashPassword });

        const data = newUser.toObject();
        delete data.password;
        return res.status(200).json({ success: true, message: "Successfully registered!", data });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// 2. Login User
export const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, isDeleted: false });
        if (!user) return res.status(404).json({ success: false, message: "User not found..." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid password..." });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, message: "Logged in!", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// 3. Fetch User 
export const fetchUser = async (req, res) => {
    try {
        const users = await userModel.find({ isDeleted: false });
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Get Profile
export const getProfile = async (req, res) => {
    try {
        return res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Update User
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true });
        return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 6. Logout User
export const logOutUser = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};