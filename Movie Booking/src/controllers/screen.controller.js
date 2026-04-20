import { screenModel } from "../models/screen.model.js";
import deleteData from "../utils/deleteData.util.js";
import fetchData from "../utils/fetchData.util.js";

export const addScreen = async (req, res) => {
    try {

        const { screenName } = req.body;

        if (!screenName) return res.status(400).json({ success: false, message: "screenName is required" });

        const screen = await screenModel.findOne({ screenName, isDeleted: false });

        if (screen) return res.status(400).json({ success: false, message: "screen exist..." });

        const newScreen = await screenModel.create({ screenName });

        return res.status(200).json({ success: true, message: "Successfully created...", data: newScreen });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const updateScreen = async (req, res) => {
    try {

        if (!req.body.screenName || !req.body.newScreenName) return res.status(401).json({ success: false, message: "invalid input..." });

        const screen = await screenModel.findOne({ screenName: { $regex: req.body.screenName, $options: 'i' }, isDeleted: false });

        if (!screen) return res.status(404).json({ success: false, message: "screen not found..." });

        const newScreen = await screenModel.findOneAndUpdate(
            { screenName: req.body.screenName },
            { screenName: req.body.newScreenName },
            { new: true }
        )

        return res.status(200).json({ success: true, message: "Successfully updated...", data: newScreen });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const fetchScreen = async (req, res) => {
    try {
        const screen = await fetchData(screenModel, "screenName", req);

        return res.status(200).json({ success: true, message: 'all screen...', data: screen });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const deleteScreen = async (req, res) => {
    try {

        const id = req.params.id;
        console.log(id)
        const deleteScreen = await deleteData(screenModel, id);

        return res.status(200).json({data: deleteScreen});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
};
