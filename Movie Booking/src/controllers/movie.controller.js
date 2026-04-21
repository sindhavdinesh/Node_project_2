import { movieModel } from "../models/movie.model.js";

// 1. Add Movie
export const addMovie = async (req, res) => {
    try {
        const { title } = req.body;

        let movie = await movieModel.findOne({ title, isDeleted: false });
        if (movie) return res.status(400).json({ success: false, message: "Movie already exists!" });

        let imagePath = "";
        if (req.file) {
            imagePath = `/images/${req.file.filename}`;
        } else {
            return res.status(400).json({ success: false, message: "Movie image is required!" });
        }

        movie = await movieModel.create({
            ...req.body,
            posterImage: imagePath
        });

        return res.status(201).json({ success: true, message: "Successfully added!", data: movie });

    } catch (error) {
        console.error("Controller Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// 2. Fetch All Movies 
export const fetchMovie = async (req, res) => {
    try {
        const data = await movieModel.find({ isDeleted: false });
        return res.status(200).json({ 
            success: true, 
            message: "All movies fetched successfully", 
            data 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Delete Movie 
export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        await movieModel.findByIdAndUpdate(id, { isDeleted: true });
        return res.status(200).json({ success: true, message: "Movie deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};