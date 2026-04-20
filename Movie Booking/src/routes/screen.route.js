import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { addScreen, deleteScreen, fetchScreen, updateScreen } from "../controllers/screen.controller.js";
import { addScreenValidator, updateScreenValidator } from "../middleware/validators/express.validator.js";
import validate from "../middleware/validators/validate.js";

const screenRouter = Router();

screenRouter.post('/add-screen', verifyToken, verifyRole('admin'), addScreenValidator, validate,addScreen);

screenRouter.put('/update-screen', verifyToken, verifyRole('admin'), updateScreenValidator, validate,updateScreen);

screenRouter.get('/fetch-screen', verifyToken, fetchScreen);

screenRouter.put('/delete-screen/:id', verifyToken, verifyRole('admin'), deleteScreen);

export default screenRouter;