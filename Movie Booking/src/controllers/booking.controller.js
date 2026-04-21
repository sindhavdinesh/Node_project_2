import { bookingModel } from "../models/booking.model.js";
import { showModel } from "../models/show.model.js";

// 1. Add Booking
export const addBooking = async (req, res) => {
    try {
        const { showId, seats } = req.body;
        const userId = req.user._id;
        const existingBooking = await bookingModel.findOne({ userId, showId, isDeleted: false });
        if (existingBooking) return res.status(409).json({ success: false, message: "Booking already exists..." });

        const show = await showModel.findOne({ _id: showId, isDeleted: false });
        if (!show) return res.status(404).json({ success: false, message: 'Show not found...' });

        const alreadyBooked = seats.some(seat => show.reservedSeats.includes(seat));
        if (alreadyBooked) return res.status(400).json({ success: false, message: "Seats already booked" });

        const data = await bookingModel.create({
            userId,
            showId,
            seats,
            totalAmount: seats.length * (show.price || show.ticketPrice)
        });

        await showModel.findByIdAndUpdate(showId, {
            $push: { reservedSeats: { $each: seats } },
            $inc: { availableSeats: -seats.length }
        });

        return res.status(200).json({ success: true, message: "Successfully booked...", data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Fetch Booking 
export const fetchBooking = async (req, res) => {
    try {
        let { search, sortBy = "createdAt", sortOrder = "asc", page = 1, limit = 10 } = req.query;
        page = Number(page); limit = Number(limit);

        const pipeline = [
            { $match: { isDeleted: false } },
            { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
            { $unwind: "$user" },
            { $lookup: { from: "shows", localField: "showId", foreignField: "_id", as: "show" } },
            { $unwind: "$show" },
            { $lookup: { from: "movies", localField: "show.movieId", foreignField: "_id", as: "movie" } },
            { $unwind: "$movie" },
            { $lookup: { from: "screens", localField: "show.screenId", foreignField: "_id", as: "screen" } },
            { $unwind: "$screen" },
            { $facet: {
                data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
                totalCount: [{ $count: "count" }]
            }}
        ];

        const result = await bookingModel.aggregate(pipeline);
        const data = result[0].data;
        const totalRecords = result[0].totalCount[0]?.count || 0;

        return res.status(200).json({ success: true, totalRecords, page, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 3. My Booking
export const myBooking = async (req, res) => {
    try {
        const data = await bookingModel.find({ userId: req.user._id, isDeleted: false })
            .populate({ path: 'showId', populate: [{ path: "movieId" }, { path: "screenId" }] });
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Update Booking
export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { seats } = req.body;
        const booking = await bookingModel.findById(id);
        const updated = await bookingModel.findByIdAndUpdate(id, { seats }, { new: true });
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Cancel Booking
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        return res.status(200).json({ success: true, message: "Booking cancelled" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};