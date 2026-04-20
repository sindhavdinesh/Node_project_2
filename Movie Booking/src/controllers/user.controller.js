import { userModel } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fetchData from "../utils/fetchData.util.js";
import deleteData from "../utils/deleteData.util.js";

export const registerUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email, isDeleted: false });

        if (user) return res.status(400).json({ success: false, message: 'user exist...' });

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        let newUser = await userModel.create({
            ...req.body,
            password: hashPassword,
        })

        const { password, ...safeUser } = newUser._doc;

        return res.status(200).json({ success: true, message: "Successfully added...", data: safeUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const logInUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({
            email,
            isDeleted: false
        });

        if (!user) return res.status(404).json({ success: false, message: "user not found..." });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ success: false, message: "Invalid password..." });

        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

        return res.status(200).json({ success: true, message: "Successfully logged in...", token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const getProfile = async (req, res) => {
    try {

        const userId = req.user._id;

        const user = await userModel.findById(userId);

        if (!user) return res.status(404).json({ success: false, message: "user not found ..." });

        return res.status(200).json({ success: true, message: "Successfully found...", user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const fetchUser = async (req, res) => {
    try {

        const user = await fetchData(userModel, "userName", req)

        return res.status(200).json({ success: true, message: 'all Users...', data: user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const updateUser = async (req, res) => {
    try {

        const userId = req.user._id;
        const { userName, password, previousPassword } = req.body;

        if ((userName && password) || (userName && previousPassword)) return res.status(401).json({ success: false, message: "invalid input..." });

        const user = await userModel.findOne({
            _id: userId,
            isDeleted: false
        });

        if (!user) return res.status(401).json({ success: false, message: "not found..." });

        let updatedUser = {};

        if (userName) {
            updatedUser = await userModel.findByIdAndUpdate(userId, {
                userName,
            }, { returnDocument: 'after' })
        }
        else if (password) {

            if (!previousPassword) return res.status(400).json({ success: false, message: "Previous password required" });

            const match = await bcrypt.compare(previousPassword, user.password);

            if (!match) return res.status(401).json({ success: false, message: "password not match..." });

            const newPassword = await bcrypt.hash(password, 10);

            updatedUser = await userModel.findByIdAndUpdate(userId, {
                password: newPassword
            }, { returnDocument: 'after' });
        }

        return res.status(200).json({ success: true, message: "Successfully updated...", data: updatedUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const logOutUser = async (req, res) => {
    try {

        const id = req.user._id;

        const data = await deleteData(userModel, id)

        return res.status(200).json({ data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};