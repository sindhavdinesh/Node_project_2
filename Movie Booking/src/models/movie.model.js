import mongoose, { Schema } from "mongoose";

const movieSchema = Schema({
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: "" },
    duration: { type: String }, 
    genre: { type: [String], default: [] },
    language: { type: String, default: "Hindi" },
    posterImage: { type: String, required: true }, 
    releaseDate: { type: String, default: Date.now }, 
    rating: { type: Number, min: 0, max: 10, default: 0 },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    versionKey: false
});

export const movieModel = mongoose.model('movies', movieSchema);