import mongoose, { Schema } from "mongoose";

const screenSchema = Schema({
    screenName: { type: String, required: true }, 
    location: { type: String, required: true },
    totalSeats: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });

export const screenModel = mongoose.model('screens', screenSchema);