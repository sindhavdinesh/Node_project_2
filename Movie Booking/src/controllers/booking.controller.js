import { bookingModel } from "../models/booking.model.js";
import { showModel } from "../models/show.model.js";
import fetchData from "../utils/fetchData.util.js";
import deleteData from "../utils/deleteData.util.js";

export const addBooking = async (req, res) => {
    try {

        const booking = await bookingModel.findOne({ userId: req.user._id, showId: req.body.showId, isDeleted: false });

        if (booking) return res.status(409).json({ success: false, message: "Booking already exists..." });

        const show = await showModel.findOne({ _id: req.body.showId, isDeleted: false });

        if (!show) return res.status(404).json({ success: false, message: 'show not found...' });

        const alreadyBooked = Array.isArray(req.body.seats) &&
            req.body.seats.some(seat => show.reservedSeats.includes(seat));

        if (alreadyBooked) return res.status(400).json({ success: false, message: "Some seats already booked" });

        const price = show.ticketPrice;

        const data = await bookingModel.create({
            userId: req.user._id,
            ...req.body,
            totalAmount: req.body.seats.length * price
        });

        show.reservedSeats.push(...req.body.seats);
        await show.save();

        return res.status(200).json({ success: true, message: "Successfully booked...", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { seats } = req.body || {};

        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Request body is missing"
            });
        }

        const booking = await bookingModel.findOne({ _id: id, isDeleted: false });
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (!seats || seats.length === 0)
            return res.status(400).json({ message: "Seats required" });

        const show = await showModel.findById(booking.showId);
        if (!show) return res.status(404).json({ message: "Show not found" });

        show.reservedSeats = show.reservedSeats.filter(
            seat => !booking.seats.includes(seat)
        );

        const alreadyBooked = seats.some(seat =>
            show.reservedSeats.includes(seat)
        );

        if (alreadyBooked) {
            return res.status(400).json({ message: "Seats already booked" });
        }

        show.reservedSeats.push(...seats);
        await show.save();

        const totalAmount = seats.length * show.ticketPrice;

        const updated = await bookingModel.findByIdAndUpdate(
            id,
            { seats, totalAmount },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Booking updated",
            data: updated
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const myBooking = async (req, res) => {
    try {

        const userId = req.user._id;

        const data = await bookingModel.find({ userId, isDeleted: false }).populate({
            path: 'showId',
            populate: [
                { path: "movieId", select: 'title' },
                { path: "screenId", select: 'screenName' },
            ]
        });

        return res.status(200).json({ success: true, message: "My Data...", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const fetchBooking = async (req, res) => {
    try {
        let {
            search,
            sortBy = "createdAt",
            sortOrder = "asc",
            page = 1,
            limit = 10
        } = req.query;

        page = Number(page);
        limit = Number(limit);

        const matchStage = {
            isDeleted: false
        };

        let searchMatch = {};

        if (search) {
            const regex = new RegExp(search, "i");

            searchMatch = {
                $or: [
                    { "user.userName": regex },
                    { "user.email": regex },
                    { "movie.title": regex },
                    { "screen.screenName": regex }
                ]
            };
        }

        const pipeline = [
            { $match: matchStage },

            // 🔗 JOIN USER
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },

            // 🔗 JOIN SHOW
            {
                $lookup: {
                    from: "shows",
                    localField: "showId",
                    foreignField: "_id",
                    as: "show"
                }
            },
            { $unwind: "$show" },

            // 🔗 JOIN MOVIE
            {
                $lookup: {
                    from: "movies",
                    localField: "show.movieId",
                    foreignField: "_id",
                    as: "movie"
                }
            },
            { $unwind: "$movie" },

            // 🔗 JOIN SCREEN
            {
                $lookup: {
                    from: "screens",
                    localField: "show.screenId",
                    foreignField: "_id",
                    as: "screen"
                }
            },
            { $unwind: "$screen" },

            // 🔍 SEARCH
            ...(search ? [{ $match: searchMatch }] : []),

            // 🔃 SORT
            {
                $sort: (() => {
                    if (sortBy === "userName") {
                        return { "user.userName": sortOrder === "asc" ? 1 : -1 };
                    } else if (sortBy === "movieTitle") {
                        return { "movie.title": sortOrder === "asc" ? 1 : -1 };
                    } else if (sortBy === "screenName") {
                        return { "screen.screenName": sortOrder === "asc" ? 1 : -1 };
                    } else {
                        return { [sortBy]: sortOrder === "asc" ? 1 : -1 };
                    }
                })()
            },

            // 📊 PAGINATION + COUNT
            {
                $facet: {
                    data: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            }
        ];

        const result = await bookingModel.aggregate(pipeline);

        const data = result[0].data;
        const totalRecords = result[0].totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalRecords / limit);

        return res.status(200).json({
            success: true,
            message: "data fetched successfully",
            count: data.length,
            totalRecords,
            totalPages,
            page,
            limit,
            data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params

        const booking = await bookingModel.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const data = await deleteData(bookingModel, id);

        const show = await showModel.findById(booking.showId);

        if (show) {
            show.reservedSeats = show.reservedSeats.filter(
                seat => !booking.seats.includes(seat)
            );
            await show.save();
        }

        await show.save();

        return res.status(200).json({ data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error..." });
    }
};

