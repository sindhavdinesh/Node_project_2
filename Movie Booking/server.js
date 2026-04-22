import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import connectDB from "./src/config/connectDB.db.js";
import router from './src/routes/index.route.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));

// API Route
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});
