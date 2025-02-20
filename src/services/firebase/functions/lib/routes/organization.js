"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../controllers/database");
const organizationRoutes = express_1.default.Router();
const getOrganization = async (req, res, next) => {
    try {
        const data = await (0, database_1.getData)('organization', req.params.id);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
};
organizationRoutes.get('/:id', getOrganization);
exports.default = organizationRoutes;
