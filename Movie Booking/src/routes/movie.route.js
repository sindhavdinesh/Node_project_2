import { Router } from "express";
const router = Router();

// 1. fetchMovie 
import { addMovie, fetchMovie } from "../controllers/movie.controller.js"; 
import upload from "../middleware/multer.js";

// POST URL
router.post('/add', upload.single('movieImage'), addMovie);

// 2. GET URL
router.get('/all', fetchMovie);

export default router;