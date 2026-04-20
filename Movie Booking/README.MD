# 🎬 Movie Booking API

A RESTful backend system for managing a movie ticket booking platform built with Node.js, Express, MongoDB, JWT authentication, and role-based access control.

---

## 🚀 Features

- 👤 User authentication (Register / Login / Profile)
- 🔐 JWT-based authentication
- 🛡️ Role-based access control (admin / user)
- 🎥 Movie CRUD with image upload
- 🎬 Screen management
- 📅 Show scheduling with time validation
- 🎟️ Seat booking system
- 📊 Booking history (user + admin)
- 🔍 Search, sorting & pagination support
- 🗑️ Soft delete system

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcrypt
- Multer
- express-validator
- dotenv

---

## 📁 Project Structure

Movie Booking/
├── app.js
├── package.json
└── src/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── utils/

---

## ⚙️ Installation

### 1. Clone repo
git clone <repo-url>
cd movie-booking

### 2. Install dependencies
npm install

### 3. Create .env file

PORT=3000
DB_PATH=mongodb://localhost:27017/movie-booking
SECRET_KEY=your_jwt_secret

---

## ▶️ Run Project

npm run dev

Server runs at:
http://localhost:3000

---

## 🔑 Authentication

Authorization: Bearer <token>

---

## 📌 API Endpoints

### Auth
- POST /api/register
- POST /api/login

### Users
- GET /api/user/get-profile
- POST /api/user/update-user
- PUT /api/user/log-out-user
- GET /api/user/fetch-user (admin)

### Movies
- POST /api/movie/add-movie (admin)
- POST /api/movie/update-movie/:id (admin)
- GET /api/movie/fetch-movie
- DELETE /api/movie/delete-movie/:id (admin)

### Screens
- POST /api/screen/add-screen (admin)
- PUT /api/screen/update-screen (admin)
- GET /api/screen/fetch-screen
- PUT /api/screen/delete-screen/:id (admin)

### Shows
- POST /api/show/add-show (admin)
- GET /api/show/fetch-show
- PUT /api/show/update-show/:id (admin)
- DELETE /api/show/cancel-show/:id (admin)

### Bookings
- POST /api/booking/add-booking
- PUT /api/booking/update-booking/:id
- DELETE /api/booking/cancel-booking/:id
- GET /api/booking/my-booking
- GET /api/booking/fetch-booking (admin)

---

## 🧠 Highlights

- Seat conflict prevention
- Show time validation
- Soft delete system
- JWT authentication
- Aggregation-based admin booking search

---

## 👨‍💻 Author

Built with Node.js + MongoDB