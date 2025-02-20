"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../controllers/database");
const userRoutes = express_1.default.Router();
const getUser = async (req, res) => {
    try {
        const data = await (0, database_1.getData)('user', req.params.id);
        res.json({ data: data });
    }
    catch (error) {
        const err = error;
        res.json({ error_message: err.message });
    }
};
userRoutes.get('/:id', getUser);
exports.default = userRoutes;
