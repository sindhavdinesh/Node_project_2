require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const connectDB = require('./config/dbConnection');

const categoryRouter = require('./routes/category.route');
const userRouter = require('./routes/user.route');
const router = require("./src/routes/index.route"); 

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/uploads", express.static("uploads"));

app.use('/api', router);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
