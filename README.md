# 🚀 Backend Task 2: Secure REST API with JWT & SQL

## 📌 Project Overview

This project is a **production-ready backend API** built using **Node.js and Express.js** with **JWT authentication** and **MySQL database integration**.

It demonstrates real-world backend concepts including:

* User authentication
* Secure password handling
* Protected routes
* Relational database design
* CRUD operations

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Authentication:** JWT (JSON Web Token)
* **Security:** bcrypt (password hashing)

---

## ✨ Features Implemented

### 🔐 Authentication System

* User Signup
* User Login
* Password hashing using bcrypt
* JWT-based authentication

### 🗄️ Database Design

* **Users Table**
* **Posts Table**
* One-to-Many relationship (One user → Many posts)

### 📦 CRUD Operations (Posts)

* Create Post
* Get All Posts
* Update Post
* Delete Post

### 🔒 Protected Routes

* Only authenticated users can:

  * Create
  * Update
  * Delete posts

---

## 🧱 Project Structure

```
backend-project/
│── server.js
│── package.json
│── node_modules/
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/backend-task.git
cd backend-task
```

---

### 2️⃣ Install Dependencies

```
npm install
```

---

### 3️⃣ Setup MySQL Database

Open MySQL Workbench and run:

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

### 4️⃣ Configure Database Connection

In `server.js`, update:

```
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task2_db'
});
```

---

### 5️⃣ Run Server

```
node server.js
```

✅ Expected Output:

```
MySQL Connected
Server running on port 5000
```

---

## 🧪 API Testing (Postman)

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
* JWT authentication for secure access
* Protected API routes

---

## 🎯 Conclusion

This project showcases a **secure and scalable backend system** with proper authentication, database design, and API structure, suitable for real-world applications.

---

## 📌 Author

Tejash
