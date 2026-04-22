# 🛒 ShopKart Pro - Premium eCommerce Backend

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

```text
ShopKart-Pro/
├── public/                 # Product images and static assets
├── src/
│   ├── config/             # DB Connection (connectDB.js)
│   ├── controllers/        # Cart, Order, Product, & User Logic
│   ├── middleware/         # Auth, FileUpload, & Input Validation
│   ├── models/             # Mongoose Schemas (Cart, Order, Product, User)
│   ├── routes/             # RESTful API Endpoints
│   └── utils/              # Helper functions (Image upload, Data formatters)
├── server.js               # Main entry point
└── README.md               # Documentation

## 📡 API Overview (Endpoints)

| Module   | Method | Endpoint                    | Description                         |
| :------- | :----- | :-------------------------- | :---------------------------------- |
| Auth     | POST   | /api/user/register          | Create a new premium account        |
| Products | GET    | /api/product/all            | Fetch all luxury products           |
| Cart     | POST   | /api/cart/add               | Add items to the shopping cart      |
| Orders   | POST   | /api/order/checkout         | Place a new order                   |
| Admin    | PUT    | /api/admin/update-stock     | Update inventory levels             |
| Profile  | GET    | /api/user/my-orders         | View user's purchase history        |
