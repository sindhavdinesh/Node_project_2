import { Router } from "express";
import { fetchUser, getProfile, logOutUser, updateUser, registerUser, logInUser } from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { userUpdateValidation } from "../middleware/validators/express.validator.js";
import validate from "../middleware/validators/validate.js";

const userRouter = Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', logInUser);

userRouter.get('/fetch-user', verifyToken, verifyRole('admin'), fetchUser);
userRouter.get('/get-profile', verifyToken, getProfile);
userRouter.post('/update-user', verifyToken, userUpdateValidation, validate, updateUser);
userRouter.put('/log-out-user', verifyToken, logOutUser);

export default userRouter;