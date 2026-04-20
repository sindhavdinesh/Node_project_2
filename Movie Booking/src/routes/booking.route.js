import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { addBooking, cancelBooking, fetchBooking, myBooking, updateBooking } from "../controllers/booking.controller.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { addBookingValidator, updateBookingValidator } from "../middleware/validators/express.validator.js";
import validate from "../middleware/validators/validate.js";

const bookingRoute = Router();

bookingRoute.get('/fetch-booking', verifyToken, verifyRole('admin'), fetchBooking);

bookingRoute.post('/add-booking', verifyToken, addBookingValidator, validate, addBooking);

bookingRoute.put('/update-booking/:id', verifyToken, updateBookingValidator, validate,updateBooking);

bookingRoute.delete('/cancel-booking/:id', verifyToken, cancelBooking);

bookingRoute.get('/my-booking', verifyToken, myBooking);

export default bookingRoute;