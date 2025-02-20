"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler = async (req, res) => {
    try {
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        const message = 'Internal Server Error';
        res.status(statusCode).json({
            error_message: message,
        });
    }
    catch (error) {
        console.error('Error verifying admin:', error);
        res.status(403).json({ error_message: 'Invalid token' });
    }
};
exports.default = handler;
