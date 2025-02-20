"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../controllers/database");
const ResponseError_1 = __importDefault(require("../model/ResponseError"));
const projectRoutes = express_1.default.Router();
const saveProject = async (req, res) => {
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
        const err = error;
        res.json({
            error_message: err.message,
            status_code: err.statusCode,
        });
    }
};
const getProject = async (req, res) => {
    try {
        const projectID = req.params.projectID;
        const data = await (0, database_1.getData)('portfolio', projectID);
        if (data === null) {
            throw new ResponseError_1.default(`${projectID} could not be found.`, 404);
        }
        res.json({ data: data });
    }
    catch (error) {
        const err = error;
        res.json({
            error_message: err.message,
            status_code: err.statusCode,
        });
    }
};
projectRoutes.post('/:projectID', saveProject);
projectRoutes.get('/:projectID', getProject);
exports.default = projectRoutes;
