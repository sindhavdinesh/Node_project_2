import { showModel } from "../models/show.model.js";
import deleteData from "../utils/deleteData.util.js";
import fetchData from "../utils/fetchData.util.js";

// 1. Add Show
export const addShow = async (req, res) => {
    try {
        
        const { screenId, movieId, startTime, endTime, ticketPrice, price } = req.body;

        
        const finalPrice = ticketPrice || price;

        const start = new Date(startTime);
        const end = new Date(endTime);
        const now = new Date();

        // Basic Validation
        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({ success: false, message: "Invalid date format" });
        }
        if (start <= now) {
            return res.status(400).json({ success: false, message: "Start time must be in future" });
        }
        if (end <= start) {
            return res.status(400).json({ success: false, message: "End time must be after start time" });
        }

        // Overlap Check
        const conflict = await showModel.findOne({
            screenId,
            isDeleted: false,
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }
            ]
        });

        if (conflict) {
            return res.status(409).json({ success: false, message: "Show timing conflict! This screen is busy." });
        }

        // Reactivate soft deleted show if exact same exists
        const isExist = await showModel.findOneAndUpdate(
            { screenId, movieId, startTime: start, isDeleted: true },
            { isDeleted: false, endTime: end, price: finalPrice },
            { new: true }
        );

        if (isExist) {
            return res.status(200).json({ success: true, message: "Show re-activated...", data: isExist });
        }

        // Create New Show
        const data = await showModel.create({
            ...req.body,
            price: finalPrice, 
            startTime: start,
            endTime: end
        });

        return res.status(200).json({ success: true, message: "Show successfully added!", data });

    } catch (error) {
        console.log("Add Show Error:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// 2. Fetch Show
export const fetchShow = async (req, res) => {
    try {
        const data = await showModel.find({ isDeleted: false })
            .populate('movieId')
            .populate('screenId');
        return res.status(200).json({ success: true, message: "fetch data...", data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Update Show
export const updateShow = async (req, res) => {
    try {
        const { id } = req.params;
        const show = await showModel.findOne({ _id: id, isDeleted: false });
        if (!show) return res.status(404).json({ success: false, message: "Show not found" });

        let start = req.body.startTime ? new Date(req.body.startTime) : show.startTime;
        let end = req.body.endTime ? new Date(req.body.endTime) : show.endTime;

        const updatedShow = await showModel.findByIdAndUpdate(
            id,
            { ...req.body, startTime: start, endTime: end },
            { new: true }
        );

        return res.status(200).json({ success: true, message: "Successfully updated...", data: updatedShow });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Cancel/Delete Show 
export const cancelShow = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await showModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!data) return res.status(404).json({ success: false, message: "Show not found!" });
        return res.status(200).json({ success: true, message: "Show cancelled successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};