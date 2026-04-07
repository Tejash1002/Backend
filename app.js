 const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authController = require('./controllers/authController');
const postController = require('./controllers/postController');
const verifyToken = require('./middleware/auth');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Auth Routes
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);

// Protected Post Routes (require verifyToken middleware)
app.get('/api/posts', postController.getAllPosts); // GET all posts (includes Author name)
app.post('/api/posts', verifyToken, postController.createPost); // POST new post
app.put('/api/posts/:id', verifyToken, postController.updatePost); // UPDATE post
app.delete('/api/posts/:id', verifyToken, postController.deletePost); // DELETE post

// Simple health check
app.get('/', (req, res) => res.send('Backend API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});