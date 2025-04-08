const jwt = require('jsonwebtoken');

// Middleware to verify user roles
const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userRole = decodedToken.role; // Extract role from token

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
            }
            next();
        } catch (error) {
            res.status(401).json({ message: 'Authentication Failed' });
        }
    };
};

module.exports = verifyRole;

