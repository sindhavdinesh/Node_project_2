import mongoose, { Schema } from "mongoose";

const bookingSchema = Schema({
    showId: {
        type: Schema.Types.ObjectId,
        ref: 'shows',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    seats: {
        type: [String],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'confirmed'
    },
    isDeleted: { 
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false });

export const bookingModel = mongoose.model('bookings', bookingSchema);
