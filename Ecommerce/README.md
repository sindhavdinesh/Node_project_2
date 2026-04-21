# 🎬 Movie Booking System - Backend

A professional-grade Node.js backend architecture for a Movie Ticket Booking application. This system handles everything from secure user authentication to complex show scheduling and real-time seat reservations.

---

## 🌟 Key Features

- **Robust Authentication**: JWT-based security with Role-Based Access Control (RBAC).
- **Movie Management**: Full CRUD operations with support for movie posters via Multer.
- **Cinema Logic**: 
  - Manage multiple screens and theater locations.
  - Smart scheduling with automated timing conflict detection.
- **Booking Engine**: 
  - Real-time seat reservation (e.g., A1, A2).
  - Dynamic seat availability tracking (`availableSeats` vs `totalSeats`).
  - Automatic price calculation.
- **Performance**: Optimized data fetching using MongoDB Aggregation pipelines and indexing.
- **Integrity**: Soft-delete functionality for all critical records.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt
- **File Handling**: Multer for image uploads

---

## 📂 Project Structure

```text
Movie Booking/
├── public/                 # Static assets (Movie posters & images)
├── src/
│   ├── config/             # Database configuration (MongoDB connection)
│   ├── controllers/        # Core business logic (Booking, Show, Movie, User)
│   ├── middleware/         # Auth guards, role verification, & validators
│   ├── models/             # Mongoose schemas & data structure
│   ├── routes/             # Express API routes
│   ├── utils/              # Reusable helper utilities
│   └── .env                # Environment variables (Secrets)
├── .gitignore              # Files to be excluded from version control
├── server.js               # Application entry point
└── README.md               # Project documentation


## 📡 API Overview (Endpoints)

| Module   | Method | Endpoint                    | Description                         |
| :------- | :----- | :-------------------------- | :---------------------------------- |
| Auth     | POST   | /api/user/login             | Returns secure JWT token            |
| Movie    | POST   | /api/movie/add              | Add movie with poster upload        |
| Screen   | GET    | /api/screen/fetch-screen    | List all cinema halls               |
| Show     | POST   | /api/show/add-show          | Schedule a movie on a screen        |
| Booking  | POST   | /api/booking/add-booking    | Reserve seats for a show            |
| User     | GET    | /api/booking/my-booking     | Fetch user's booking history        |

Author
Sindhav Dinesh