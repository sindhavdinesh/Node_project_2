# 🛒 E-Commerce Backend API

A scalable and secure **E-Commerce Backend API** built using **Node.js, Express.js, and MongoDB**.
This project provides complete backend functionality including authentication, product management, cart, wishlist, and order handling.

---

## Features

* 🔐 User Authentication (JWT Based)
* 📦 Product Management (CRUD Operations)
* 🗂 Category & Subcategory Management
* 🛒 Cart Management System
* ❤️ Wishlist Functionality
* 📑 Order Management
* 🖼 Image Upload Support (Multer)
* ✅ Input Validation (express-validator)
* 🛡 Secure APIs with Middleware & Role-Based Access

---

## 🛠 Tech Stack

| Technology        | Description         |
| ----------------- | ------------------- |
| Node.js           | Runtime Environment |
| Express.js        | Backend Framework   |
| MongoDB           | NoSQL Database      |
| Mongoose          | ODM for MongoDB     |
| JWT               | Authentication      |
| Multer            | File Upload         |
| express-validator | Validation          |

---

## 📁 Project Structure

```
Ecommerce/
│
├── config/
│   └── dbConnection.js
│
├── controllers/
│   ├── cart.controller.js
│   ├── category.controller.js
│   ├── product.controller.js
│   ├── subcategory.controller.js
│   ├── user.controller.js
│   └── wishlist.controller.js
│
├── middleware/
│   ├── AuthToken.js
│   ├── UploadImage.js
│   ├── validationUser.js
│   └── VerifyRole.js
│
├── models/
│   ├── cart.model.js
│   ├── category.model.js
│   ├── product.model.js
│   ├── subCategory.model.js
│   ├── user.model.js
│   └── wishlist.model.js
│
├── routes/
│   ├── cart.route.js
│   ├── category.route.js
│   ├── index.route.js
│   ├── product.route.js
│   ├── subcategory.route.js
│   ├── user.route.js
│   └── wishlist.route.js
│
├── public/
├── uploads/
├── .env
├── app.js / server.js
├── package.json
└── package-lock.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone <your-repo-url>
cd ecommerce
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Setup Environment Variables

Create `.env` file:

```
PORT=1024
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run Project

### Development Mode

```
npm run dev
```

### Production Mode

```
node server.js
```

---

## 🔗 API Endpoints

### 🔐 Authentication

* POST `/api/user/register` → Register User
* POST `/api/user/login` → Login User

---

### 📦 Products

* POST `/api/product/add`
* GET `/api/product/all`
* PUT `/api/product/update/:id`
* DELETE `/api/product/delete/:id`

---

### 🗂 Category

* POST `/api/category/add`
* GET `/api/category/all`
* PUT `/api/category/update/:id`
* DELETE `/api/category/delete/:id`

---

### 🧩 SubCategory

* POST `/api/subcategory/add`
* GET `/api/subcategory/all`
* PUT `/api/subcategory/update/:id`
* DELETE `/api/subcategory/delete/:id`

---

### 🛒 Cart

* POST `/api/cart/add`
* GET `/api/cart/all`
* PUT `/api/cart/update/:id`
* DELETE `/api/cart/remove/:id`

---

### ❤️ Wishlist

* POST `/api/wishlist/add`
* GET `/api/wishlist/all`
* DELETE `/api/wishlist/remove/:id`

---

## 🔐 Authentication

All protected routes require JWT token:

```
Authorization: Bearer <token>
```

---

## 🧠 Key Concepts Covered

* REST API Development
* MVC Architecture
* Authentication & Authorization
* File Upload Handling
* Middleware Usage
* MongoDB Relations
* CRUD Operations

---

## 👨‍💻 Author

**Sindhav Dinesh**

---

## ⭐ Conclusion

This project demonstrates a complete backend system for an E-Commerce platform, covering real-world features and scalable architecture.

---
