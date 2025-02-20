"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../controllers/database");
const projectRoutes = express_1.default.Router();
const saveProject = async (req, res, next) => {
    try {
        const id = req.params.projectID;
        const data = await (0, database_1.postData)('portfolio', id, req.body);
        if (!data) {
            res.json({
                error_message: `Project with the #ID: ${id} could not be updated.`,
            });
        }
        res.json({
            success_message: `Project with the #ID: ${id} was updated.`,
        });
    }
    catch (error) {
        next(error);
    }
};
const getProject = async (req, res, next) => {
    try {
        const projectID = req.params.projectID;
        const data = await (0, database_1.getData)('portfolio', projectID);
        if (!data) {
            res.json({
                error_message: `${projectID} could not be found.`,
                status_code: 404,
            });
        }
        res.json({ data: data });
    }
    catch (error) {
        next(error);
    }
};
projectRoutes.post('/:projectID', saveProject);
projectRoutes.get('/:projectID', getProject);
exports.default = projectRoutes;
