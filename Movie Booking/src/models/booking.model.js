import mongoose, { Schema } from "mongoose";

const bookingSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    showId: {
        type: Schema.Types.ObjectId,
        ref: 'shows',
        required: true
    },
    seats: {
        type: [String],
        default: []
    },
    totalAmount: {
        type: Number,
        min: 0,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

export const bookingModel = mongoose.model('bookings', bookingSchema);

