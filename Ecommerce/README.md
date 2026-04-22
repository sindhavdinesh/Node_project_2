# 🛒 Ecommerce API - Backend

A robust and secure Node.js backend for a modern Ecommerce platform. This system handles product catalogs, user authentication, shopping carts, and order processing with a professional folder architecture.

---

## 🌟 Key Features

- **User Authentication**: Secure JWT-based login and registration.
- **Product Management**: CRUD operations for products with category support.
- **Image Uploads**: Local file storage support for product images via Multer (stored in `/uploads`).
- **Cart Logic**: Manage user-specific shopping carts with real-time updates.
- **Order Tracking**: Complete order lifecycle management from checkout to delivery.
- **Middleware Security**: Protected routes for Admin and authenticated Users.
- **Scalable Architecture**: Modular folder structure for easy maintenance.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT (JSON Web Tokens) & Bcrypt
- **File Handling**: Multer (for `/uploads`)

---

## 📂 Project Structure

```text
Ecommerce/
├── config/             # Database connection & environment setup
├── controllers/        # Core logic (Product, Cart, Order, User)
├── middleware/         # Auth guards, role checks, & image validators
├── models/             # Mongoose Schemas (User, Product, Cart, Order)
├── routes/             # API Endpoints (user.route.js, product.route.js, etc.)
├── uploads/            # Static storage for Product images
├── .gitignore          # Files to ignore (node_modules, .env)
├── server.js           # Entry point of the server
└── README.md           # Documentation
Author
Sindhav Dinesh
