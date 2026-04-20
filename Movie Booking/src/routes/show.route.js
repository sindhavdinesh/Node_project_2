import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { addShow, cancelShow, fetchShow, updateShow } from "../controllers/show.controller.js";
import { addShowValidator, updateShowValidator } from "../middleware/validators/express.validator.js";
import validate from "../middleware/validators/validate.js";

const showRouter = Router();

showRouter.post('/add-show', verifyToken, verifyRole("admin"), addShowValidator, validate,addShow);

showRouter.get('/fetch-show', verifyToken, fetchShow);

showRouter.put('/update-show/:id', verifyToken, verifyRole("admin"), updateShowValidator, validate,updateShow);

showRouter.delete('/cancel-show/:id', verifyToken, verifyRole("admin"), cancelShow);

export default showRouter