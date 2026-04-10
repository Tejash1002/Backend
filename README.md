# 🚀 Backend Task 2: Secure REST API with JWT & MySQL

## 📌 Project Overview
This project is a **secure and scalable backend API** built using **Node.js, Express.js, and MySQL**. It implements **JWT-based authentication**, **role-based access structure**, and **CRUD operations** following **MVC architecture**.

The system allows users to register, log in, and manage posts securely.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Authentication:** JWT (JSON Web Token)  
- **Security:** bcrypt (password hashing)  
- **Architecture:** MVC (Model-View-Controller)

---

## ✨ Features

### 🔐 Authentication System
- User Signup  
- User Login  
- Password hashing using bcrypt  
- JWT token generation and verification  

### 🗄️ Database Design
- Users table  
- Posts table  
- One-to-Many relationship (1 user → many posts)  

### 📦 CRUD Operations
- Create Post  
- Get All Posts  
- Update Post  
- Delete Post  

### 🔒 Protected Routes
- Only authenticated users can:
  - Create posts  
  - Update posts  
  - Delete posts  

### 🧱 Architecture
- MVC pattern (controllers, middleware, config separation)  
- Middleware-based authentication  

---

## 🧱 Project Structure
