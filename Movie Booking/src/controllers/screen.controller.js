import { screenModel } from "../models/screen.model.js";

// 1. Add Screen
export const addScreen = async (req, res) => {
    try {
        const screenData = {
            name: req.body.screenName || req.body.name, 
            location: req.body.location,
            totalSeats: req.body.totalSeats
        };
        const data = await screenModel.create(screenData);
        return res.status(201).json({ success: true, message: "Screen added!", data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Fetch Screen
export const fetchScreen = async (req, res) => {
    try {
        const data = await screenModel.find({ isDeleted: false });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Update Screen
export const updateScreen = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await screenModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Delete Screen
export const deleteScreen = async (req, res) => {
    try {
        const { id } = req.params;
        await screenModel.findByIdAndUpdate(id, { isDeleted: true });
        return res.status(200).json({ success: true, message: "Deleted!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};