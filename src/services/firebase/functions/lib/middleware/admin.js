"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAdmin = async (req, res, next) => {
    try {
        if (!req.rawHeaders || !req.rawHeaders) {
            return res.status(200).json({
                error_message: 'Access denied. Admins only.',
                status_code: 403,
            });
        }
        next();
        return;
    }
    catch (error) {
        const err = error;
        return res.status(200).json({ error_message: err, status_code: 403 });
    }
};
exports.default = checkAdmin;
