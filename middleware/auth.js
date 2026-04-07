const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user payload (id, role) to request
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = verifyToken;