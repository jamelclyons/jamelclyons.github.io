"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../controllers/database");
const ResponseError_1 = __importDefault(require("../model/ResponseError"));
const organizationRoutes = express_1.default.Router();
const getOrganization = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await (0, database_1.getData)('organization', id);
        if (data === null) {
            throw new ResponseError_1.default(`${id} could not be found.`, 404);
        }
        res.json(data);
    }
    catch (error) {
        const err = error;
        res.json({
            error_message: err.message,
            status_code: err.statusCode,
        });
    }
};
organizationRoutes.get('/:id', getOrganization);
exports.default = organizationRoutes;
