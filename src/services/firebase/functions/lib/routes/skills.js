"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../controllers/database");
const skillsRoutes = express_1.default.Router();
const getSkills = async (req, res, next) => {
    try {
        const data = await (0, database_1.getDataCollection)(req.params.collection);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
};
skillsRoutes.get('/:collection', getSkills);
exports.default = skillsRoutes;
