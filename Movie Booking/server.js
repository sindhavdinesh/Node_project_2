import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import connectDB from "./src/config/connectDB.db.js";
import router from './src/routes/index.route.js';

const app = express();
const port = process.env.PORT;

// middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));

// routes
app.use('/api', router);

// run server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    connectDB();
});