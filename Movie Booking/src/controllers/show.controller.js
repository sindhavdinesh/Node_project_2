import { showModel } from "../models/show.model.js";
import deleteData from "../utils/deleteData.util.js";
import fetchData from "../utils/fetchData.util.js";

export const addShow = async (req, res) => {
    try {

        const show = await showModel.findOne({
            screenId: req.body.screenId,
            startTime: new Date(req.body.startTime),
            isDeleted: false
        })

        if (show) return res.status(409).json({ success: false, message: "already exist..." });

        const start = new Date(req.body.startTime);
        const end = new Date(req.body.endTime);
        const now = new Date();

        if (isNaN(start) || isNaN(end)) {
            return res.status(400).json({
                message: "Invalid date format"
            });
        }

        if (start <= now) {
            return res.status(400).json({
                message: "Start time must be in future"
            });
        }

        if (end <= start) {
            return res.status(400).json({
                message: "End time must be after start time"
            });
        }

        const isExist = await showModel.findOne({
            screenId: req.body.screenId,
            startTime: new Date(req.body.startTime),
            isDeleted: true
        });

        if (isExist) {
            const data = await showModel.findOneAndUpdate({
                movieId: req.body.movieId,
                screenId: req.body.screenId,
                startTime: new Date(req.body.startTime),
                isDeleted: true
            }, {
                isDeleted: false
            }, {
                new: true
            });
            return res.status(200).json({ success: true, message: "Successfully updated...", data });
        }

        const data = await showModel.create({
            ...req.body
        })

        return res.status(200).json({ success: true, message: "Successfully added...", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const fetchShow = async (req, res) => {
    try {

        const data = await fetchData(showModel, ['startTime', 'endTime'], req);

        return res.status(200).json({ success: true, message: "fetch data...", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const updateShow = async (req, res) => {
    try {
        const { id } = req.params;

        const show = await showModel.findOne({ _id: id, isDeleted: false });
        if (!show) return res.status(404).json({ success: false, message: "not found..." });

        let start = show.startTime;
        let end = show.endTime;

        if (req.body.startTime) start = new Date(req.body.startTime);
        if (req.body.endTime) end = new Date(req.body.endTime);

        const now = new Date();

        if (isNaN(start) || isNaN(end)) return res.status(400).json({ message: "Invalid date format..." });
        if (start <= now) return res.status(400).json({ message: "Start time must be in future..." });
        if (end <= start) return res.status(400).json({ message: "End time must be after start time..." });

        const conflict = await showModel.findOne({
            _id: { $ne: id },
            screenId: req.body.screenId || show.screenId,
            isDeleted: false,
            $or: [
                {
                    startTime: { $lt: end },
                    endTime: { $gt: start }
                }
            ]
        });

        if (conflict)
            return res.status(400).json({ message: "Show timing conflict on same screen..." });

        const updatedShow = await showModel.findByIdAndUpdate(
            id,
            { ...req.body, startTime: start, endTime: end },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Successfully updated...",
            data: updatedShow
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const cancelShow = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await deleteData(showModel, id);

        return res.status(200).json({ data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};
