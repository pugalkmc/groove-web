import { expressjwt } from 'express-jwt';
import { JWT_SECRET } from '../../config.js';

// Middleware to verify JWT token and insert user data into request object
const authMiddleware = expressjwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    getToken: function(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});

const attachUserToRequest = (req, res, next) => {
    if (req.auth) {
        req.user = req.auth; // Attach user data to request object
    }
    next();
};

const errorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next(err);
};

export { authMiddleware, attachUserToRequest, errorHandler };
