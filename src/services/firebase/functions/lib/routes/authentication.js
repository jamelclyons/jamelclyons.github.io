"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_1 = __importDefault(require("../middleware/token"));
const authRoutes = express_1.default.Router();
// export const signInWithCustomToken = async (customToken: string): Promise<string> => {
// };
const authCheck = async (req, res) => {
    try {
        await (0, token_1.default)(req);
        res.json({ success_message: 'Token is valid.' });
    }
    catch (error) {
        const err = error;
        res.json({
            error_message: err.message,
            status_code: err.statusCode,
        });
    }
};
authRoutes.post('/check', authCheck);
exports.default = authRoutes;
