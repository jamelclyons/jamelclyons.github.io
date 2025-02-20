"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_1 = __importDefault(require("../middleware/token"));
const authRoutes = express_1.default.Router();
const authCheck = async (req, res) => {
    try {
        const idToken = await (0, token_1.default)(req);
        console.log(req);
        if (!idToken) {
            res.status(200).json({
                error_message: 'Unauthorized: No authentication token provided.',
                status_code: 403,
            });
        }
        if (typeof idToken === 'object') {
            if (idToken && idToken?.isAdmin && idToken.isAdmin === true) {
                res.set('Authorization', 'new Token');
            }
        }
        res.json({ success_message: 'Token is valid.' });
    }
    catch (error) {
        const err = error;
        res.json({ error_message: err.message, status_code: 403 });
    }
};
authRoutes.get('/check', authCheck);
exports.default = authRoutes;
