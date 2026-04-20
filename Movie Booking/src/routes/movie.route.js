import { Router } from "express";
import { addMovie, deleteMovie, fetchMovie, updateMovie } from "../controllers/movie.controller.js";
import { addMovieValidator, updateMovieValidator } from "../middleware/validators/express.validator.js";
import verifyToken from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import IMAGE from '../middleware/multer.js'
import validate from "../middleware/validators/validate.js";

const movieRouter = Router();

movieRouter.post('/add-movie', verifyToken, verifyRole('admin'), IMAGE.single('posterImage'), addMovieValidator, validate, addMovie);

movieRouter.post('/update-movie/:id', verifyToken, verifyRole('admin'), updateMovieValidator, validate,IMAGE.single('posterImage'), updateMovie);

movieRouter.get('/fetch-movie', verifyToken, fetchMovie);

movieRouter.delete('/delete-movie/:id', verifyToken, verifyRole('admin'), deleteMovie)

export default movieRouter;