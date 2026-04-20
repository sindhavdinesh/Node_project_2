import fs from "fs";
import { movieModel } from "../models/movie.model.js";
import path from 'path'
import fetchData from '../utils/fetchData.util.js';
import deleteData from '../utils/deleteData.util.js';
import { model } from "mongoose";

export const addMovie = async (req, res) => {
    try {

        let movie = await movieModel.findOne({
            isDeleted: false,
            title: req.body.title,
        })

        if (movie) return res.status(400).json({ success: false, message: "already exist..." });

        let imagePath = "";
        if (req.file) imagePath = `/images/${req.file.filename}`;

        movie = await movieModel.create({
            ...req.body,
            posterImage: imagePath
        })

        return res.status(200).json({ success: true, message: "Successfully added...", data: movie });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const updateMovie = async (req, res) => {
    try {

        const { id } = req.params;

        const movie = await movieModel.findOne({ _id: id, isDeleted: false });

        if (!movie) return res.status(404).json({ success: false, message: "not found..." });

        let imagePath = movie.posterImage;

        if (req.file) {
            const oldPath = `public${imagePath}`

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            imagePath = `/images/${req.file.filename}`;
        }

        const data = await movieModel.findByIdAndUpdate(
            id,
            {
                ...req.body,
                posterImage: imagePath
            },
            { new: true }
        )

        return res.status(200).json({ success: true, message: "Successfully updated...", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const fetchMovie = async (req, res) => {
    try {

        const data = await fetchData(movieModel, ["title", 'genre', "language"],req)
        
        return res.status(200).json({ success: true, message: "all movies...", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const deleteMovie = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await deleteData(movieModel,id);
        
        return res.status(200).json({ data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};