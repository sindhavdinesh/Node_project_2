# 🛒 E-Commerce api project Backend

A high-performance, scalable backend for a luxury eCommerce platform. This system handles complex product catalogs, secure user authentication, shopping carts, and order management with a focus on luxury aesthetics and speed.

---

## 🌟 Key Features

- **Advanced Auth**: JWT-based authentication with encrypted passwords using Bcrypt.
- **Product Management**: 
  - CRUD operations for premium products.
  - Category-based filtering and search functionality.
  - Multiple image upload support via Multer.
- **Shopping Cart System**: 
  - Persistent cart management (linked to User ID).
  - Real-time stock validation (prevents overselling).
- **Order Engine**: 
  - Detailed order tracking (Pending, Shipped, Delivered).
  - Automatic total calculation including taxes and shipping.
- **Security**: Role-based access (Admin can manage inventory, Users can shop).
- **Optimized Performance**: Aggregation pipelines for dashboard analytics and sales reports.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Image Hosting**: Cloudinary / Local Storage (Multer)

---

## 📂 Project Structure
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

## 📡 API Overview (Endpoints)

| Module   | Method | Endpoint                    | Description                         |
| :------- | :----- | :-------------------------- | :---------------------------------- |
| Auth     | POST   | /api/user/register          | Create a new premium account        |
| Products | GET    | /api/product/all            | Fetch all luxury products           |
| Cart     | POST   | /api/cart/add               | Add items to the shopping cart      |
| Orders   | POST   | /api/order/checkout         | Place a new order                   |
| Admin    | PUT    | /api/admin/update-stock     | Update inventory levels             |
| Profile  | GET    | /api/user/my-orders         | View user's purchase history        |
