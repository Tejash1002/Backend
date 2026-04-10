# 🚀 Backend Task 2: Secure REST API with JWT & MySQL

## 📌 Project Overview

This project is a **secure and scalable backend API** built using **Node.js, Express.js, and MySQL**. It implements **JWT-based authentication**, **CRUD operations**, and follows a clean **MVC architecture**.

The system allows users to register, log in, and manage posts securely.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Authentication:** JWT (JSON Web Token)
* **Security:** bcrypt (password hashing)
* **Architecture:** MVC (Model-View-Controller)

---

## ✨ Features

### 🔐 Authentication System

* User Signup
* User Login
* Password hashing using bcrypt
* JWT token generation and verification

### 🗄️ Database Design

* Users table
* Posts table
* One-to-Many relationship (1 user → many posts)

### 📦 CRUD Operations

* Create Post
* Get All Posts
* Update Post
* Delete Post

### 🔒 Protected Routes

* Only authenticated users can:

  * Create posts
  * Update posts
  * Delete posts

### 🧱 Architecture

* MVC pattern (controllers, middleware, config separation)
* Middleware-based authentication

---

## 🧱 Project Structure

```
backend-task/
│── config/
│   └── db.js
│── controllers/
│   ├── authController.js
│   └── postController.js
│── middleware/
│   └── auth.js
│── app.js
│── package.json
│── .env
│── .gitignore
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/Tejash1002/Backend.git
cd backend-task
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Setup MySQL Database

Run this in MySQL Workbench:

```
CREATE DATABASE task2_db;
USE task2_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

### 4️⃣ Configure Environment Variables

Create a `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=task2_db
JWT_SECRET=secretkey
```

---

### 5️⃣ Run the Server

```
node app.js
```

✅ Expected Output:

```
MySQL Connected
Server running on port 5000
```

---

## 🧪 API Endpoints

### 🔹 Signup

**POST** `/signup`

```
{
  "name": "Tejash",
  "email": "tejash@gmail.com",
  "password": "123456"
}
```

---

### 🔹 Login

**POST** `/login`

```
{
  "email": "tejash@gmail.com",
  "password": "123456"
}
```

➡️ Returns JWT Token

---

### 🔹 Create Post (Protected)

**POST** `/posts`

Header:

```
Authorization: Bearer <token>
```

Body:

```
{
  "title": "My First Post",
  "content": "Hello world"
}
```

---

### 🔹 Get Posts

**GET** `/posts`

---

### 🔹 Update Post

**PUT** `/posts/:id`

---

### 🔹 Delete Post

**DELETE** `/posts/:id`

---

## 🔐 Security Practices

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Environment variables for sensitive data

---

## 🎯 Conclusion

This project demonstrates a **secure, scalable, and production-ready backend system** using modern technologies. It follows **MVC architecture**, implements **JWT authentication**, and integrates **relational database design**.

---

## 📌 Author

**Tejash**
