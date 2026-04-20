import { Router } from "express";
import { logInUser, registerUser } from "../controllers/user.controller.js";
import { authValidator } from "../middleware/validators/express.validator.js";
import userRouter from "./user.route.js";
import screenRouter from "./screen.route.js";
import movieRouter from "./movie.route.js";
import showRouter from "./show.route.js";
import bookingRoute from "./booking.route.js";
import validate from "../middleware/validators/validate.js";

const router = Router();

router.post('/register', authValidator, validate,registerUser);

router.post('/login', authValidator, validate,logInUser);

router.use('/user', userRouter);

router.use('/screen', screenRouter);

router.use('/movie', movieRouter);

router.use('/show', showRouter);

router.use('/booking', bookingRoute)

export default router