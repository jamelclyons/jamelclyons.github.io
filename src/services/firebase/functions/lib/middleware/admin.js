"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("./token"));
const checkAdmin = async (req, res, next) => {
    try {
        const idToken = await (0, token_1.default)(req);
        if (!idToken || typeof idToken !== "string") {
            throw new Error("Unauthorized: Invalid token");
        }
        req.headers.authorization = `Bearer ${idToken}`;
        next();
    }
    catch (error) {
        console.error("Auth Error:", error);
        res.status(403).json({
            error_message: error.message || "Unauthorized",
            status_code: 403,
        });
    }
};
exports.default = checkAdmin;
