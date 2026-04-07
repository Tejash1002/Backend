const db = require('../config/db');

// Create a new post (Protected)
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id; // Extracted from JWT token

        const [result] = await db.execute(
            'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
            [title, content, userId]
        );

        res.status(201).json({ message: "Post created", postId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all posts with Author names (Bonus: SQL JOIN)
exports.getAllPosts = async (req, res) => {
    try {
        const [posts] = await db.execute(`
            SELECT posts.*, users.username as author 
            FROM posts 
            JOIN users ON posts.user_id = users.id 
            ORDER BY posts.created_at DESC
        `);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a post (Protected: Only the owner can update)
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.id;

        // Check if post exists and belongs to the user
        const [post] = await db.execute('SELECT * FROM posts WHERE id = ? AND user_id = ?', [id, userId]);
        if (post.length === 0) {
            return res.status(403).json({ message: "Unauthorized or Post Not Found" });
        }

        await db.execute('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id]);
        res.json({ message: "Post updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a post (Protected: Only the owner can delete)
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const [post] = await db.execute('SELECT * FROM posts WHERE id = ? AND user_id = ?', [id, userId]);
        if (post.length === 0) {
            return res.status(403).json({ message: "Unauthorized or Post Not Found" });
        }

        await db.execute('DELETE FROM posts WHERE id = ?', [id]);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};