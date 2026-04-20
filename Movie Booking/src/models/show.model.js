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
    ticketPrice: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        default: 60
    },
    reservedSeats: {
        type: [String],
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
