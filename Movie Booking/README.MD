# 🎬 Movie Booking API - Backend

A professional and robust Node.js backend architecture for a Movie Ticket Booking application. This project features secure authentication, cinema hall management, and real-time seat reservation logic.

---

## 🌟 Key Features

- **JWT Authentication**: Secure user login/registration with role-based access.
- **Show Management**: Smart scheduling that prevents timing conflicts on the same screen.
- **Seat Booking Engine**: 
  - Real-time seat reservation (e.g., A1, A2).
  - Automated tracking of `availableSeats` and `reservedSeats`.
- **File Storage**: Movie posters managed via Multer and stored in `public/images`.
- **Advanced Querying**: MongoDB Aggregation pipelines for complex data fetching.
- **Soft Delete**: Data integrity maintained using `isDeleted` flags across all modules.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT (JSON Web Tokens) & Bcrypt
- **Storage**: Local Disk Storage (Multer)

---

## 📂 Project Structure

```text
Movie Booking/
├── public/
│   └── images/         # Movie posters and static assets
├── src/
│   ├── config/         # Database connection setup
│   ├── controllers/    # Core business logic (Booking, Show, Movie, User)
│   ├── middleware/     # Auth guards, role checks, and validators
│   ├── models/         # Mongoose Schemas & Data Models
│   ├── routes/         # RESTful API Endpoints
│   └── utils/          # Global helper functions (Data Fetch/Delete)
├── .gitignore          # Environment & node_modules exclusion
├── server.js           # Main application entry point
└── README.md           # Documentation

## 📡 API Overview (Endpoints)

| Module   | Method | Endpoint                    | Description                         |
| :------- | :----- | :-------------------------- | :---------------------------------- |
| Auth     | POST   | /api/user/login             | Returns secure JWT token            |
| Movie    | POST   | /api/movie/add              | Add movie with poster upload        |
| Screen   | GET    | /api/screen/fetch-screen    | List all cinema halls               |
| Show     | POST   | /api/show/add-show          | Schedule a movie on a screen        |
| Booking  | POST   | /api/booking/add-booking    | Reserve seats for a show            |
| User     | GET    | /api/booking/my-booking     | Fetch user's booking history        |
