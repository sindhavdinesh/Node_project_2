import mongoose, { Schema } from "mongoose";

const showSchema = Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'movies',
        required: true
    },
    screenId: {
        type: Schema.Types.ObjectId,
        ref: 'screens',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    price: { // Controller ke saath match karne ke liye 'price' rakha hai
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        default: 60
    },
    availableSeats: { // Ye track karega ki kitni seats bachi hain
        type: Number,
        default: 60
    },
    reservedSeats: {
        type: [String], // Example: ["A1", "A2", "B5"]
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

export const showModel = mongoose.model('shows', showSchema);